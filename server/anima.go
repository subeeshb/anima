package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/spf13/cobra"
	"github.com/subeeshb/anima/config"
	_ "github.com/subeeshb/anima/migrations"
	"github.com/subeeshb/anima/utils"
)

func main() {
	fmt.Printf("%s - v%s\r\n", config.AppName, config.AppVersion)

	app := pocketbase.New()

	app.RootCmd.AddCommand(&cobra.Command{
		Use:   "generate-types",
		Short: "Generate TypeScript schema definitions",
		Run: func(cmd *cobra.Command, args []string) {
			collections, err := app.FindAllCollections()
			if err != nil {
				log.Fatal(err)
			}

			for _, collection := range collections {
				if collection.System || collection.Name == "users" {
					continue
				}

				utils.GenerateTypeScriptSchema(collection)
			}
		},
	})

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Dashboard
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./web-html"), false))

		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
