import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { User, UserService } from "../auth/user.service";
import { ItemFilterComponent } from "./item-filter/item-filter.component";
import { ItemListComponent } from "./item-list/item-list.component";
export interface Review {
    // id: number;
    user: string;
    review: string;
}

export interface Rating {
    // id: number;
    user: string;
    review: number;
}

export interface Prices {
    // id: number;
    seat: string;
    price: number;
}

export interface Item {
    id: number;
    name: string;
    type: string;
    desc: string;
    actors: Array<string>;
    imageSrc: string;
    duration: string;
    seats: Array<string>;
    director: string;
    releaseDate: Date;
    projDate: Array<Date>;
    prices: Array<Prices>;
    reviews: Array<Review>;
    ratings: Array<Rating>;
}

@Injectable()
export class ShopService implements OnInit{

    static itemListUpdated = new EventEmitter<void>();

    constructor(private userService: UserService) {}

    static priceList: Array<number> = [800, 1200];
    static typeList: Array<string> = ["Drama", "Romance", "Action", "Comedy", "Thriller", "Animated"];

    static brandList: Array<string> = ["Nike", "Adidas", "Zara", "Puma", "Louis Vuitton"];
    static sizeList: Array<string> = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    static itemList: Array<Item>;
    static FinalItemList: Array<Item>;
    static IsFormClicked: boolean = false;

    

    ngOnInit(): void {
        ShopService.itemListUpdated.subscribe(() => {
            // ShopService.initializeItemList(this.userService);
        });
    }

    passFinalItemList(list: Array<Item>){
        ShopService.FinalItemList = list;
        ShopService.IsFormClicked = true;
        console.log(ShopService.FinalItemList);
        ShopService.itemListUpdated.emit();
    }

    getItemById(id: number): Item{
        var foundItem!: Item;
        ShopService.itemList.forEach((item) => {
            if(item.id == id){
                foundItem = item;
            }
        });
        return foundItem;
    }

    static initializeItemList(userService: UserService): void {
        this.itemList = [
            
            {
                
                id: 0,
                name: "Five feet apart",
                type: "Romance",
                desc: "Romantika vauuu",
                imageSrc: "assets/movieImages/5feet.jpg", 
                actors: ["Haley Lu Richardson", "Cole Sprouse", "Moises Arias"],
                duration: "1h 57m",
                seats: ["Regular", "Vip"],
                director: "Justin Baldoni",
                releaseDate: new Date("2024-04-18"),
                projDate: [new Date("2025-05-20"), new Date("2025-05-21")],
                prices: [
                    {seat: "regular", price: 800.00},
                    {seat: "vip", price: 1200.00},
                ],
                reviews: [
                    { user: userService.getUserById(1).name, review: "10/10 reccomend!!" },
                    { user: userService.getUserById(4).name, review: "Love the movie." },
                    { user: userService.getUserById(6).name, review: "Awesome" },
                    { user: userService.getUserById(7).name, review: "Wow!" },
                ],
                ratings: [
                    { user: userService.getUserById(1).email, review: 5 },
                    { user: userService.getUserById(7).email, review: 4 }
                ]
            },

            {
                id: 1,
                name: "10 Things I Hate About You",
                type: "Romantic comedy",
                desc: "10 Things I Hate About You is a romantic comedy set in a high school, where a popular student, Cameron, hires a rebellious boy, Patrick, to date the difficult Kat, so her younger sister can date. As Patrick and Kat's relationship develops, they both confront their pasts and learn about love, vulnerability, and self-discovery.",
                imageSrc: "assets/movieImages/10things.jpg",
                actors: ["Heath Ledger", "Julia Stiles", "Joseph Gordon-Levitt "],
                duration: " 1h 37min",
                seats: ["Regular", "Vip"],
                director: "Gil Junger",
                releaseDate: new Date("1999-03-31"),
                projDate: [new Date("2025-05-23"), new Date("2025-05-25")],
                prices: [
                    {seat: "regular", price: 800.00},
                    {seat: "vip", price: 1200.00},
                ],
                reviews: [
                    { user: userService.getUserById(1).name, review: "A witty, modern take on Shakespeare with great chemistry." },
                    { user: userService.getUserById(4).name, review: "Fun, heartfelt, and timeless teen rom-com." },
                    { user: userService.getUserById(6).name, review: "A clever, entertaining rom-com with standout performances." },
                    { user: userService.getUserById(7).name, review: "Iconic, charming, and full of memorable moments." },
                ],
                ratings: [
                    { user: userService.getUserById(1).email, review: 4 },
                    { user: userService.getUserById(7).email, review: 4 }
                ]
            },
            {
            id: 2,
            name: "Away from her ",
            type: "Drama",
            desc: "Away from Her tells the story of a woman, Fiona, who is diagnosed with Alzheimer's disease and enters a care facility, leaving her husband, Grant, to navigate the pain of her gradual memory loss. As Fiona forms a bond with another patient, Grant must confront his own emotions and the shifting dynamics of their relationship.",
           imageSrc: "assets/movieImages/awayfromher.jpg", 
            actors: ["Julie Christie", "Gordon Pinsent", "Olympia Dukakis"],
            duration: "1h 50m",
            seats: ["Regular", "Vip"],
            director: "Sarah Polley",
            releaseDate: new Date("2007-05-04"),
            projDate: [new Date("2025-05-22"), new Date("2025-05-23")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A poignant, emotional story about love and memory loss." },
                { user: userService.getUserById(4).name, review: "Beautifully acted and deeply moving." },
                { user: userService.getUserById(6).name, review: "A powerful, heart-wrenching exploration of Alzheimer's." },
                { user: userService.getUserById(7).name, review: "A tender, unforgettable film about love and letting go." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },

        {
            id: 3,
            name: "Barbie",
            type: "Fantasy comedy",
            desc: "The Barbie movie follows Barbie as she leaves her perfect, pink world to explore the real world, seeking self-discovery and understanding. Along the way, she confronts societal expectations, challenges stereotypes, and embarks on a journey of empowerment and personal growth.",
            imageSrc: "assets/movieImages/barbie.jpg", 
            actors: ["Margot Robbie", "Ryan Gosling", "Kate McKinnon"],
            duration: "1h 54m",
            seats: ["Regular", "Vip"],
            director: "Greta Gerwig",
            releaseDate: new Date("2023-07-21"),
            projDate: [new Date("2025-04-25"), new Date("2025-05-26")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A fun, vibrant take on identity and self-discovery." },
                { user: userService.getUserById(4).name, review: "Visually stunning and cleverly satirical." },
                { user: userService.getUserById(6).name, review: "A playful yet thought-provoking adventure." },
                { user: userService.getUserById(7).name, review: "Charming, humorous, and empowering." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        {
            id: 4,
            name: "Before We Go",
            type: "Romantic drama",
            desc: "Before We Go follows two strangers, Nick and Brooke, who meet by chance in New York City and spend the night helping each other with personal struggles. As they share their vulnerabilities and experiences, they form a deep connection that changes their lives.",
            imageSrc: "/assets/movieImages/beforewego.jpg", 
            actors: ["Chris Evans", "Alice Eve", "Marco Rodriguez"],
            duration: "1h 30m",
            seats: ["Regular", "Vip"],
            director: "Chris Evans",
            releaseDate: new Date("2015-09-04"),
            projDate: [new Date("2025-06-23"), new Date("2025-07-24")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A charming, heartfelt romance about connection and self-discovery." },
                { user: userService.getUserById(4).name, review: "A sweet, intimate story with great chemistry between the leads." },
                { user: userService.getUserById(6).name, review: "A simple, yet meaningful film about life's unexpected moments." },
                { user: userService.getUserById(7).name, review: "Tender and emotional, with a relatable take on love and vulnerability." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 4 },
                { user: userService.getUserById(7).email, review: 4 }
            ]
        },
        {
            id: 5,
            name: "Borat",
             type: "Satirical mockumentary comedy",
            desc: "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan follows the eccentric and crude journalist Borat as he travels through the United States to make a documentary about American culture. The film blends real-life interactions with scripted absurdity, satirizing social norms, politics, and cultural stereotypes in a bold and controversial way.",
            imageSrc: "assets/movieImages/borat.jpg", 
            actors: ["Sacha Baron Cohen", "Pamela Anderson", "Cathy Lady"],
            duration: "1h 24m",
            seats: ["Regular", "Vip"],
            director: "Larry Charles",
            releaseDate: new Date("2006-11-03"),
            projDate: [new Date("2025-04-24"), new Date("2025-04-25")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A hilarious, controversial mockumentary that pushes boundaries." },
                { user: userService.getUserById(4).name, review: "Bold, absurd, and painfully funny." },
                { user: userService.getUserById(6).name, review: "A wildly entertaining and satirical exploration of American culture." },
                { user: userService.getUserById(7).name, review: "Sacha Baron Cohen’s outrageous performance makes this a standout comedy." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        {
            id: 6,
            name: "Challengers",
             type: "Romantic sports drama",
            desc: "Challengers follows the story of a love triangle between a rising tennis player, his girlfriend, and his former best friend, who is also a rival on the court. As they navigate personal and professional challenges, their relationships are tested by competition, ambition, and the complexities of love.",
            imageSrc: "assets/movieImages/challengers.jpg", 
            actors: ["Zendaya", "Mike Faist ", "Austin Butler"],
            duration: "1h 58m",
            seats: ["Regular", "Vip"],
            director: "Luca Guadagnino",
            releaseDate: new Date("2023-09-15"),
            projDate: [new Date("2025-04-19"), new Date("2025-04-25")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A gripping, stylish love triangle set in the high-stakes world of tennis." },
                { user: userService.getUserById(4).name, review: "Intense, emotional, and beautifully shot, with standout performances." },
                { user: userService.getUserById(6).name, review: "A compelling exploration of passion, rivalry, and love." },
                { user: userService.getUserById(7).name, review: "A visually striking and dramatic film with complex character dynamics." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 4 }
            ]
        },
        {
            id: 7,
            name: "Frozen",
           type: "Animated musical fantasy",
            desc: "Frozen tells the story of two sisters, Elsa and Anna, in the kingdom of Arendelle. When Elsa accidentally unleashes her magical ice powers, Anna embarks on a perilous journey to find her, facing dangers and discovering the true meaning of love and sisterhood.",
            imageSrc: "assets/movieImages/frozen.jpg", 
            actors: ["Idina Menzel", "Kristen Bell ", "Josh Gad"],
            duration: "1h 42m",
            director: "Chris Buck",
            seats: ["Regular", "Vip"],
            releaseDate: new Date("2013-11-27"),
            projDate: [new Date("2025-04-03"), new Date("2025-04-11")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A magical, heartwarming tale with unforgettable music." },
                { user: userService.getUserById(4).name, review: "A visually stunning, fun adventure about love and sisterhood." },
                { user: userService.getUserById(6).name, review: "A Disney classic that captivates with its emotional depth and catchy songs." },
                { user: userService.getUserById(7).name, review: "Brilliant animation, charming characters, and powerful themes of family." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 4 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        {
            id: 8,
            name: "The Hunger Games",
            type: "Dystopian science fiction action",
            desc: "The Hunger Games follows Katniss Everdeen, a young woman who volunteers to take her sister's place in a brutal televised competition where 24 tributes must fight to the death. As she navigates the deadly arena, Katniss becomes a symbol of resistance against the oppressive Capitol, sparking a revolution.",
            imageSrc: "assets/movieImages/hgames.jpg", 
            actors: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
            duration: "2h 22m",
            seats: ["Regular", "Vip"],
            director: "Gary Ross",
            releaseDate: new Date("2012-03-23"),
            projDate: [new Date("2025-06-19"), new Date("2025-06-22")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A thrilling, intense adaptation with a powerful lead performance by Jennifer Lawrence." },
                { user: userService.getUserById(4).name, review: "A gripping, action-packed dystopian film with strong themes of survival and rebellion." },
                { user: userService.getUserById(6).name, review: "Emotional, dramatic, and captivating from start to finish." },
                { user: userService.getUserById(7).name, review: "A powerful, thought-provoking story with unforgettable characters." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 4 },
                { user: userService.getUserById(7).email, review: 4 }
            ]
        },
        {
            id: 9,
            name: "How to Lose a Guy in 10 Days",
            type: "Romantic comedy",
            desc: "How to Lose a Guy in 10 Days follows Andie, a magazine writer who tries to push a man away in 10 days for an article, while Ben, a charming ad executive, aims to make her fall in love with him as part of a bet. As their conflicting goals create humorous chaos, they begin to develop real feelings for each other, leading to a heartwarming and comedic conclusion.",
            imageSrc: "assets/ovieImages/how2loose.jpg", 
            actors: ["Kate Hudson", "Matthew McConaughey", "Kathryn Hahn"],
            duration: "1h 56m",
            director: "Donald Petrie",
            seats: ["Regular", "Vip"],
            releaseDate: new Date("2003-02-07"),
            projDate: [new Date("2025-06-05"), new Date("2025-06-07")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A fun, lighthearted rom-com with great chemistry between the leads." },
                { user: userService.getUserById(4).name, review: "Charming and full of laughs, this film is an enjoyable ride." },
                { user: userService.getUserById(6).name, review: "A sweet, humorous take on love and misunderstandings." },
                { user: userService.getUserById(7).name, review: "Playful, entertaining, and filled with romantic comedy clichés done right." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        {
            id: 10,
            name: "La La Land",
           type: "Romantic musical drama",
            desc: "La La Land tells the story of Mia, an aspiring actress, and Sebastian, a passionate jazz musician, who fall in love while chasing their dreams in Los Angeles. As they navigate their evolving careers and relationship, they must make difficult choices that ultimately test their love and aspirations.",
            imageSrc: "assets/movieImages/lalaland.jpg", 
            actors: ["Ryan Gosling", "Emma Stone", "John Legend "],
            duration: "2h 08m",
            director: "Damien Chazelle",
            seats: ["Regular", "Vip"],
            releaseDate: new Date("2016-12-09"),
            projDate: [new Date("2025-04-17"), new Date("2025-05-01")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A visually stunning, emotionally captivating musical about dreams and love." },
                { user: userService.getUserById(4).name, review: "Beautifully shot and performed, with memorable music and incredible chemistry." },
                { user: userService.getUserById(6).name, review: "A heartfelt, bittersweet journey through love and ambition." },
                { user: userService.getUserById(7).name, review: "A dazzling tribute to classic musicals with modern flair and deep emotion." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 4 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        
        {
            id: 11,
            name: "Me Before You",
            type: "Romantic drama",
            desc: "Me Before You tells the story of Louisa Clark, a young woman who becomes a caregiver for Will Traynor, a man left paralyzed after an accident. As their bond deepens, Louisa struggles to change Will’s decision to end his life, leading to a powerful exploration of love, sacrifice, and personal choice.",
            imageSrc: "assets/movieImages/mebeforeyou.jpg", 
            actors: ["Emilia Clarke", "Sam Claflin", "Charles Dance"],
            duration: "1h 50m",
            seats: ["Regular", "Vip"],
            director: "Thea Sharrock",
            releaseDate: new Date("2016-06-03"),
            projDate: [new Date("2025-04-17"), new Date("2025-04-26")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A deeply emotional love story that tugs at the heartstrings." },
                { user: userService.getUserById(4).name, review: "Heartfelt, beautiful, and thought-provoking with strong performances." },
                { user: userService.getUserById(6).name, review: "A moving and bittersweet film about love, loss, and personal choice." },
                { user: userService.getUserById(7).name, review: "Touching and impactful, with an unforgettable central relationship." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 4 },
                { user: userService.getUserById(7).email, review: 4 }
            ]
        },

        {
            id: 12,
            name: "Oppenheimer",
             type: "Historical drama and biographical film",
            desc: "Oppenheimer follows the life of J. Robert Oppenheimer, the physicist who spearheaded the development of the atomic bomb during World War II as part of the Manhattan Project. The film explores the profound moral and ethical dilemmas he faced, as well as the personal and global consequences of creating such a destructive weapon.",
            imageSrc: "assets/movieImages/oppenheimer.jpg", 
            actors: ["Cillian Murphy ", "Emily Blunt ", "Matt Damon"],
            duration: "3h 00m",
            seats: ["Regular", "Vip"],
            director: "Christopher Nolan",
            releaseDate: new Date("2022-07-21"),
            projDate: [new Date("2025-05-19"), new Date("2025-05-24")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A gripping, intense portrayal of a brilliant mind and its consequences." },
                { user: userService.getUserById(4).name, review: "Powerful performances, especially by Cillian Murphy, in this historical epic." },
                { user: userService.getUserById(6).name, review: "A thought-provoking and visually stunning exploration of science and morality." },
                { user: userService.getUserById(7).name, review: "A deeply impactful, intricate look at history's most consequential invention." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },

        {
            id: 13,
            name: "Playing It Cool",
           type: "Romantic comedy",
            desc: "Playing It Cool follows a screenwriter who is determined to avoid falling in love, but everything changes when he meets a woman who challenges his views on relationships. As he tries to stay emotionally detached, he finds himself increasingly drawn to her, leading to comedic and heartfelt moments.",
            imageSrc: "assets/movieImages/playingitcool.jpg", 
            actors: ["Chris Evans", "Michelle Monaghan", "Topher Grace"],
            duration: "1h 35m",
            seats: ["Regular", "Vip"],
            director: "Justin Reardon",
            releaseDate: new Date("2015-03-06"),
            projDate: [new Date("2025-05-26"), new Date("2025-06-02")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A charming, lighthearted romantic comedy with great chemistry between the leads." },
                { user: userService.getUserById(4).name, review: "A fun, breezy film about love and avoiding it at all costs." },
                { user: userService.getUserById(6).name, review: "Cute, funny, and entertaining, but lacks emotional depth." },
                { user: userService.getUserById(7).name, review: "A sweet and simple rom-com with a solid performance from Chris Evans." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 4 }
            ]
        },

        {
            id: 14,
            name: "Titanic",
            type: " Romantic drama and disaster film",
            desc: "Titanic follows the love story between Jack, a poor artist, and Rose, a wealthy young woman, who meet aboard the doomed RMS Titanic. As the ship tragically sinks, their love is challenged by the disaster, social differences, and survival, culminating in an emotional and iconic ending.",
            imageSrc: "assets/movieImages/titanic.jpg", 
            actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
            duration: "3h 14m",
            seats: ["Regular", "Vip"],
            director: "James Cameron",
            releaseDate: new Date("1997-12-19"),
            projDate: [new Date("2025-04-03"), new Date("2025-04-17")],
            prices: [
                {seat: "regular", price: 800.00},
                {seat: "vip", price: 1200.00},
            ],
            reviews: [
                { user: userService.getUserById(1).name, review: "A timeless, epic romance set against a legendary tragedy.!" },
                { user: userService.getUserById(4).name, review: "Visually stunning with powerful performances and unforgettable emotion." },
                { user: userService.getUserById(6).name, review: "A sweeping love story mixed with the drama of a historic disaster." },
                { user: userService.getUserById(7).name, review: "A cinematic masterpiece that captivates with both heart and spectacle." },
            ],
            ratings: [
                { user: userService.getUserById(1).email, review: 5 },
                { user: userService.getUserById(7).email, review: 5 }
            ]
        },
        ];
        
        if(!this.IsFormClicked){
            ShopService.FinalItemList = this.itemList;
        }
    }
}