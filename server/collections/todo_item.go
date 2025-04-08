package collections

import (
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
)

func CreateTodoItemCollection(app core.App) {
	collection := core.NewBaseCollection("todo_item")

	// set rules
	collection.ViewRule = types.Pointer("@request.auth.id != '' && user = @request.auth.id")
	collection.CreateRule = types.Pointer("@request.auth.id != ''")
	collection.UpdateRule = types.Pointer(`
        @request.auth.id != '' &&
        user = @request.auth.id
    `)
	collection.DeleteRule = types.Pointer(`
        @request.auth.id != '' &&
        user = @request.auth.id
    `)

	// Add fields
	collection.Fields.Add(&core.TextField{
		Name:     "title",
		Required: true,
		Max:      1000,
	})

	collection.Fields.Add(&core.BoolField{
		Name:     "completed",
		Required: true,
	})

	// Add relation field to users
	usersCollection, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		log.Fatal(err)
	}
	collection.Fields.Add(&core.RelationField{
		Name:          "user",
		Required:      true,
		CascadeDelete: true,
		CollectionId:  usersCollection.Id,
	})

	// Add autodate/timestamp fields (created/updated)
	collection.Fields.Add(&core.AutodateField{
		Name:     "created",
		OnCreate: true,
	})
	collection.Fields.Add(&core.AutodateField{
		Name:     "updated",
		OnCreate: true,
		OnUpdate: true,
	})

	if err := app.Save(collection); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Initialised todo_item collection.")
}
