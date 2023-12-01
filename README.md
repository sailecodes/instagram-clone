# InstaIV

## A basic social media app inspired by Instagram. See below for top-level details.

### Client-side

- **Pages/Components**
  - Login (`/login`)
  - Dashboard (`/dashboard`)
    - Home (`/`)
    - Search (`/search`)
    - Create post (`/create-post`)
    - Profile (`/profile`)
      - Posts (`/`)
      - Saved posts (`/saved-posts`)

### Server-side

- **Models**
  - User
    - Email
    - Password
    - Username
    - Profile picture info
    - Bio
    - Number of posts
    - Followers
    - Following
    - Posts info
    - Saved posts info
    - Chats
  - Content
    - Public id
    - Image url
  - Post
    - Content info
    - User id
    - Caption
    - Number of likes
    - Comments
  - Comment
    - User
    - Comment
  - Chat
    - Name
    - Users
    - Messages
  - Message
    - User
    - Message
- **Routes**
  - Authentication routes
    - Public routes
    - 3 routes (`/api/v1/auth`)
      - Register (_POST_, `/register`)
      - Login (_POST_, `/login`)
      - Logout (_GET_, `/logout`)
  - User routes
    - Restricted routes
    - 6 routes (`/api/v1/users`)
      - Profile
        - Get profile (_GET_, `/:id`)
        - Update profile (_PATCH_, `/:id`)
      - Follow
        - Get followers (_GET_, `/followers`)
        - Get following (_GET_, `/following`)
        - Follow user (_UPDATE_, `/follow/:id`)
        - Unfollow user (_UPDATE_ `/unfollow/:id`)
  - Post routes
    - Restricted routes
    - 5 routes (`/api/v1/posts`)
      - Get all posts (_GET_, `/`)
      - Create post (_POST_, `/`)
      - Get post (_GET_, `/:id`)
      - Update post (_UPDATE_, `/:id`)
      - Delete post (_DELETE_, `/:id`)
