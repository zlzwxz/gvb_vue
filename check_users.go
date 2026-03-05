package main

import (
    "gvb-server/core"
    "gvb-server/global"
    "fmt"
"gvb-server/models"
)

func main() {
    core.InitConf()
    global.DB = core.InitGorm()
    var users []models.UserModel
    global.DB.Find(&users)
    for _, u := range users {
        fmt.Printf("User: %s (ID: %d), Role: %d\n", u.UserName, u.ID, u.Role)
    }
}
