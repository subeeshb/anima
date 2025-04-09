package collections

import (
	"log"

	"github.com/pocketbase/pocketbase/core"
)

func AddPermissionsToUsersCollection(app core.App) {
	collection, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		log.Fatal(err)
	}

	collection.Fields.Add(&core.JSONField{
		Name: "permissions",
	})

	if err := app.Save(collection); err != nil {
		log.Fatal(err)
	}
}
