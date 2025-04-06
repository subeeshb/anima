package main

import (
	"fmt"
	"os"

	"github.com/subeeshb/anima/config"
)

func main() {

	fmt.Printf("%s - v%s\r\n", config.AppName, config.AppVersion)

	// Default is to start the web server, unless an explicit action is specified.
	action := "serve"
	if len(os.Args) > 1 {
		action = os.Args[1]
	}

	switch action {
	case "cli":
		fmt.Println("Starting CLI...")
	case "serve":
		fmt.Println("Starting server...")

	default:
		fmt.Printf("Unknown action: %s\r\n", action)
	}
}
