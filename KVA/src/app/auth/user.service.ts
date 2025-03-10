import { Injectable } from "@angular/core";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNum: string;
    date:Date;
    address?: string;
}

@Injectable()
export class UserService {

    currentUser!: User;

    static userList: Array<User> = [
        {
            id: 0,
            name: "Til Lindeman",
            email: "tlinderman@gmail.com",
            password: "Til11111",
            phoneNum: "0000000001",
            date: new Date("2024-04-18 14:23"),
        },
        {
            id: 1,
            name: "Daryl HaLL",
            email: "dhall@gmail.com",
            password: "Daryl222",
            phoneNum: "0000000002",
            date: new Date("2024-02-18 11:25"),
        },
        {
            id: 2,
            name: "John Oates",
            email: "joates@gmail.com",
            password: "John33333",
            phoneNum: "0000000003",
            date: new Date("2024-03-24 18:43"),
        },
        {
            id: 3,
            name: "Debbie Harry",
            email: "dharry@gmail.com",
            password: "Debbie444444",
            phoneNum: "0000000004",
            date: new Date("2024-01-1 16:33"),
        },
        {
            id: 4,
            name: "Kevin Rowland",
            email: "krowland@gmail.com",
            password: "kevin123",
            phoneNum: "0000000005",
            date: new Date("2023-04-18 14:01"),
        },
        {
            id: 5,
            name: "Billy Idol",
            email: "bidol@gmail.com",
            password: "idol1234",
            phoneNum: "Billy0000006",
            date: new Date("2024-04-20 10:30"),
        },
        {
            id: 6,
            name: "David Byrne",
            email: "dbyrne@gmail.com",
            password: "David312",
            phoneNum: "0000000007",
            date: new Date("2024-04-18 14:23"),
        },
        {
            id: 7,
            name: "Ian Curtis",
            email: "icurtis@gmail.com",
            password: "Ian88888",
            phoneNum: "0000000008",
            date: new Date(),
        },
        {
            id: 8,
            name: "Dave Gahan",
            email: "dgahan@gmail.com",
            password: "Dave9999",
            phoneNum: "0000000009",
            date: new Date(),
        },
        {
            id: 9,
            name: "Lindsey Buckingham",
            email: "lbuckingham@gmail.com",
            password: "lindsey123",
            phoneNum: "0000000001",
            date: new Date("2024-02-03 19:30"),
        },
    ];

    getUserById(id: number): User{
        var foundUser!: User;
        UserService.userList.forEach((user) => {
            if(user.id == id){
                foundUser = user;
            }
        });

        var user = foundUser;
        return user;
    }

    getUser(userEmail: string): User{
        var  user = UserService.userList.find(userToFind => userToFind.email == userEmail)!;
        return user;
    }

    // getUserByPhoneNum(phoneNum: string): User{
    //     var  user = UserService.userList.find(userToFind => userToFind.phoneNum == phoneNum)!;
    //     return user;
    // }

    isPasswordCorrect(userEmail: string, userPassword: string): boolean{
        return UserService.userList.find(userToFind => (
            (userToFind.email == userEmail && userToFind.password == userPassword)
        )) != undefined;
    }

    registerUser(name: string, email: string, password: string, phoneNum: string, date: Date, address: string = ""): User{
        var maxId: number = 0;
        UserService.userList.forEach(user => {
            if(maxId < user.id){
                maxId = user.id;
            }
        });

        var id =++maxId;
        if(address == ""){
            var user: User = {id, name, email, password, phoneNum, date};
        }else{
            var user: User = {id, name, email, password, phoneNum, date, address};
        }

        UserService.userList.push(user);
        console.log(UserService.userList);
        return user;
    }
}