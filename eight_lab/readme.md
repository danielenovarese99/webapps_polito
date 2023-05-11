Film library API

# functionalities:
    -retrieve all films
    -retrieve all films given filter (all / favorite / best rated / unseen)
    -retrieve film given id
    -create film (all data necessary except id)
    -update existing film (all data that needs to be updated is necessary, except id - which will not change)
    -update the rating on a film (+ / -, cannot go below 0 / above 5)
    -mark existing film as favorite (0 / 1)
    -delete an existing film given its id

# RETRIEVE ALL FILMS [x]
    [GET] [/api/films]
    [retrieve all films available]
    [/api/films - no request body]
    [ succesful response code - 200; SAMPLE RESPONSE BODY >> 
        [
            {
                "title": "text",
                "favorite" : 0 / 1 
                "watchdate" : "text",
                "rating" : 0/5,
                "user": 0/1...
            },
            ...
        ]
    ]
    [500 generic error]

# RETRIEVE ALL FILMS GIVEN A FILTER [x]
    [GET] [/api/films]
    [retrieves all films available for given filter]
    [/api/films?filter=favorites | /api/films?filter=best-rated| /api/films?filter=unseen]
    [
        succesful response code - 200; SAMPLE RESPONSE BODY >> 
        [
            {
                "title": "text",
                "favorite" : 0 / 1 
                "watchdate" : "text",
                "rating" : 0/5,
                "user": 0/1...
            },
            ...
        ]
    ]
    [500 generic error]

# RETRIEVE FILM GIVEN AN ID [x]
    [GET] [/api/films/id]
    [retrieves a film given an id]
    [/api/films/id]
    [
        succesful response code - 200; SAMPLE RESPONSE BODY >> 
        [
            {
                "title": "text",
                "favorite" : 0 / 1 
                "watchdate" : "text",
                "rating" : 0/5,
                "user": 0/1...
            }
        ]
    ]
    [404 - id not found  | 500 generic error]

# CREATE FILM [x]
    [POST] [/api/films]
    [create a new film]
    [ Request body: JSON formatted object  /// ID AND USER ARE SET BY THE DB 
        {
            "title" : "text",
            "favorite": 0/1,
            "watchdate": "text",
            "rating": 0/5,
        }
    ]
    [Succesful creation - 201 (created)]
    [Error codes > 
        Service unavailable 503
        Unprocessable object 422 (validation error)
    ]


# UPDATE EXISTING FILM [x]
    [PUT] [/api/films/id]
    [update existing film given its ID]
    [JSON OBJECT containing updated values: 
        {
            "title" : "text",
            "favorite": 0/1,
            "watchdate": "text",
            "rating": 0/5,
        }
    ]
    [Succesfully updated 200]
    [Error codes> 
        Not found 404 
        Service unavailable 503
        Unprocessable entity 422 (validation error)
    ]


# UPDATE RATING OF A FILM [x]

    [POST] [/api/films/:id/vote]
    [Updating the rating of a film given its ID]
    [JSON OBJECT:   
        {
            "vote": "upvote" / "downvote",
        }
    ]
    [Succesfully updated - 200]
    [Error codes > 
        Not found 404
        Service unavailable 503
        Unprocessable entity 422 (validation error)
    ]

# MARK AN EXISTING FILM AS FAVORITE [x]

    [POST] [/api/films/:id/favorite]
    [Set a film given its ID as favorite / unfavorite]
    [JSON OBJECT:   
        {
            "favorite": 0 / 1,
        }
    ]
    [Succesfully updated - 200]
    [Error codes > 
        Not found 404
        Service unavailable 503
        Unprocessable entity 422 (validation error)
    ]

# DELETE AN EXISTING FILM GIVEN ITS ID []

    [DELETE] [/api/films/:id]
    [Delete an existing film given its id]
    [ no request body ]
    [Succesfully deleted film 200]
    [Error codes > 
        Not found 404
        Service unavailable 503
    ]