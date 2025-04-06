package endpoints

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/subeeshb/anima/internal/api"
)

type ExampleEndpoint struct{}

func (e *ExampleEndpoint) GetRoute() (method string, path string) {
	return "GET", "/hey/:name"
}

func (e *ExampleEndpoint) Run(request *api.Request) {
	fmt.Printf("JWT: %s\r\n", request.GetJWT())
	fmt.Printf("UID: %s\r\n", request.GetUID())

	name := request.Context.Params.ByName("name")
	request.Context.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Hey %s", name),
	})
}
