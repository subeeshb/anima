package main

import (
	"fmt"
	"os"

	"github.com/subeeshb/anima/cli"
	"github.com/subeeshb/anima/config"
	"github.com/subeeshb/anima/webserver"
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
		cli.Run()

	case "serve":
		webserver.Start()

	default:
		fmt.Printf("Unknown action: %s\r\n", action)
	}
}
