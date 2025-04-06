package webserver

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/subeeshb/anima/config"
	"github.com/subeeshb/anima/endpoints"
	"github.com/subeeshb/anima/internal/api"
)

var enabledEndpoints = []api.APIEndpoint{
	&endpoints.ExampleEndpoint{},
}

func Start() {
	fmt.Println("Starting server...")

	router := gin.Default()
	for _, endpoint := range enabledEndpoints {
		method, path := endpoint.GetRoute()
		switch method {
		case "GET":
			router.GET(path, func(c *gin.Context) {
				endpoint.Run(c)
			})
		case "POST":
			router.POST(path, func(c *gin.Context) {
				endpoint.Run(c)
			})
		default:
			panic("Unsupported HTTP method")
		}
	}

	// For all other paths not handled by an endpoint, serve them from the static folder.
	router.NoRoute(func(c *gin.Context) {
		c.File("./web-html/" + c.Request.URL.Path)
	})

	// Get the port to run on, either from the PORT env variable, or from the app config.
	port := os.Getenv("PORT")
	if port == "" {
		port = config.DefaultAppPort
	}

	router.Run(":" + port)
}
