package endpoints

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ExampleEndpoint struct{}

func (e *ExampleEndpoint) GetRoute() (method string, path string) {
	return "GET", "/hey/:name"
}

func (e *ExampleEndpoint) Run(c *gin.Context) {
	name := c.Params.ByName("name")
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Hey %s", name),
	})
}
