package api

type APIEndpoint interface {
	GetRoute() (method string, path string)
	Run(request *Request)
}
