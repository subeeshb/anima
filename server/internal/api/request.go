package api

import (
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/subeeshb/anima/config"
)

type CustomClaims struct {
	UID         string   `json:"uid"`
	DisplayName string   `json:"display_name"`
	Permissions []string `json:"permissions"`
	jwt.RegisteredClaims
}

type Request struct {
	Context *gin.Context
}

// Gets the JWT included in the request.
func (r *Request) GetJWT() string {
	// Read the content of the Authorization header
	var authHeader = r.Context.GetHeader("Authorization")
	if authHeader == "" {
		return ""
	}

	var authSegments = strings.Split(authHeader, " ")

	return authSegments[len(authSegments)-1]
}

// Gets the custom claims associated with the request's JWT, or nil if no valid JWT was found.
func (r *Request) GetJWTClaims() (*CustomClaims, error) {
	var tokenString = r.GetJWT()

	if tokenString == "" {
		return nil, nil
	}

	claims := &CustomClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		// Return the secret key for verification
		return []byte(config.JWTSecret), nil
	})

	if err != nil {
		return nil, fmt.Errorf("error parsing token: %v", err)
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, nil
}

// Parses the JWT associated with the request and returns the user ID, or an empty string if the JWT is invalid.
func (r *Request) GetUID() string {
	var claims, _ = r.GetJWTClaims()
	if claims == nil {
		return ""
	}

	return claims.UID
}

// Returns true if the request has a valid JWT.
func (r *Request) IsLoggedIn() bool {
	return r.GetUID() != ""
}
