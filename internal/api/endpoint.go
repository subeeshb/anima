package api

import "github.com/gin-gonic/gin"

type APIEndpoint interface {
	GetRoute() (method string, path string)
	Run(c *gin.Context)
}
