package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/subeeshb/anima/collections"
)

func init() {
	m.Register(func(app core.App) error {
		collections.CreateTodoItemCollection(app)

		return nil
	}, func(app core.App) error {
		// add down queries...

		return nil
	})
}
