package cli

import (
	"fmt"
	"os"
	"strings"
)

// Map of commands.
var commands = map[string]func([]string){
	"quit": func(_ []string) {
		os.Exit(0)
	},
}

func Run() {
	fmt.Println("Starting CLI... (Type 'help' for a list of commands, or 'quit' to exit.)")

	input := ""

	for {
		fmt.Print("> ")

		fmt.Scan(&input)

		// Get handler from map
		args := strings.Split(input, " ")

		command := args[0]

		// Special handling for the "help" command
		if command == "help" {
			// Print list of commands
			fmt.Println("Available commands:")

			for command, _ := range commands {
				fmt.Printf("%s\r\n", command)
			}

			continue
		}

		if handler, ok := commands[command]; ok {
			handler(args[1:])
		} else {
			fmt.Println("Unknown command: " + command)
		}
		input = ""
	}

}
