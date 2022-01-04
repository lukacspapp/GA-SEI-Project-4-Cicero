
# General Assembly Project 4: Cicero 👒

Solo Project

**_Timeframe_**

7 Days

## Goal:

Design a full-stack React app using Python, Django and PostgreSQL.

## Technologies Used

- React Hooks
- Python
- Django
- PostgreSQL
- SASS
- Braintree
- Pillow
- base64
- rest_framework
- Bootstrap
- HTTP-proxy-middleware


# Cicero

An E-Commerce website that sells hipster hats


<img src='https://i.imgur.com/9uTqWSf.png'>



## Code Installation

https://github.com/lukacspapp/SEI-Project-4-Cicero


- Clone or download the repo
- <code>cd lcodev</code> to go to the folder
- <code>pipenv shell</code> to install Python packages
- <code> python3 manage.py startserver</code> to start the backend 
- <code>cd frontend</code> to go to the frontend directory
- <code>npm i</code> to install frontend dependencies
- <code>npm start</code> to start the app

# Process

## Idea

For my final project, I wanted to push myself and build an e-commerce application with integrated payment system from [<img src='https://i.imgur.com/6ZIW98d.png' width='20px'> Braintree](https://sandbox.braintreegateway.com/)


## Planning

### Entity-Relationship-Diagram (ERD)

I used Coggle to create the ERD.

[<img src='https://pbs.twimg.com/profile_images/1110516072178946049/cLRX6_XE_400x400.png' width='20px'> Coggle](https://coggle.it/diagram/Yc3s-714-CArCURa/t/api/42b5fac89eb8a53f334c3418cc49c688752ec1b0e362d66e362e225bf71f8fbc) to the diagram 

<img src='https://i.imgur.com/SfyWMkE.png'>


### Wireframes

For the wireframes I used Figma to design the pages.

[<img src='https://i.imgur.com/vKHId13.png' width='30px'> Figma](https://www.figma.com/file/m4Qy4CCQRq71Y7xw1kbif4/ECOMMERCE-Project-4?node-id=0%3A1) to the wireframes

<img src='https://i.imgur.com/cxA5iDw.png'>

I decided to concentrate the most on the backend for this project as I was focusing on frontend and design in previous projects



## Backend

On the backend, I have four models: User, Product, Order and Category.

### User

[User File](https://github.com/lukacspapp/SEI-Project-4-Cicero/tree/main/lcodev/api/user)

Django by defult gives a user model whereby it uses the username to verfy the user. I wanted to use the eamil address to verify the user so I created the a custom user with <code>AbstractUser</code>

[User Model](https://github.com/lukacspapp/SEI-Project-4-Cicero/blob/main/lcodev/api/user/models.py)

```
 class CustomUser(AbstractUser):
    name = models.CharField(max_length = 50, default = 'Customer') 
    email = models.EmailField(max_length = 200, unique = True)
    
    username = None # because I do not want to sign in the user with username but with EMAIL

    USERNAME_FIELD = 'email' # so the username field will be governed by the email
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length = 50, blank = True, null = True)
    
    session_token = models.CharField(max_length = 10, default = 0) 

    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

```    
    
    

### Product

[Product File](https://github.com/lukacspapp/SEI-Project-4-Cicero/tree/main/lcodev/api/product)

I designed the product model with a couple of fields that I wanted to display to the user such <code>stock</code> and <code>category</code> but I have run out of time.


[Product Model](https://github.com/lukacspapp/SEI-Project-4-Cicero/blob/main/lcodev/api/product/models.py)


```
class Product(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 300)
    price = models.CharField(max_length = 50)
    stock = models.CharField(max_length = 50)
    is_active = models.BooleanField(default = True, blank = True)
    image = models.ImageField(upload_to ='images/', blank = True, null = True) # I alredy indicated to Django that itt will be in /media and now I specified this will be coming from /media/images
    category = models.ForeignKey(Category, on_delete = models.SET_NULL, blank = True, null = True) # this field is linked to Category model
    created_at = models.DateTimeField(auto_now_add = True) # it is created that is why is True not now if it would be updated_at it would be now
    updated_at = models.DateTimeField(auto_now = True)
```

### Order

[Order File](https://github.com/lukacspapp/SEI-Project-4-Cicero/tree/main/lcodev/api/order)

I designed the order model with the following fields so the admin user would have information on every order


[Order Model](https://github.com/lukacspapp/SEI-Project-4-Cicero/blob/main/lcodev/api/order/models.py)

```
class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, null = True, blank = True)
    product_names = models.CharField(max_length = 500)
    total_products = models.CharField(max_length = 500, default = 0)
    transaction_id = models.CharField(max_length = 200, default = 0)
    total_amount = models.CharField(max_length = 50, default = 0)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
```    


## Frontend

[Frontend Folder](https://github.com/lukacspapp/SEI-Project-4-Cicero/tree/main/lcodev/front-end)

The Frontend was built using React Hooks and for the sytling I choosed Bootstrap CSS framework. I only spent 3 days on the frontend as I was previously focusing on the frontend in prevoius projects. I wanted to take this opportunity to learn and practice Django and Python. In order to purchase a hat the user has to be logged in.

### Home Page

[Home Page Component](https://github.com/lukacspapp/SEI-Project-4-Cicero/blob/main/lcodev/front-end/src/core/Home.js)

<img src='https://i.imgur.com/9uTqWSf.png'> 


What I did differently in this project is that I called my api outside of the components in a separete file [coreapicalls.js](https://github.com/lukacspapp/SEI-Project-4-Cicero/edit/main/lcodev/front-end/src/core/helper/coreapicalls.js) which is made my code much more readable and clean when I needed to revisit the file.

```

const getProducts = async () => {
  return fetch('http://127.0.0.1:8000/api/product', { method: 'GET' }).then((response) => {
    return response.json()
  })
    .catch((err) => console.log(err))
}

export default getProducts
```
       
         

## Challenges 🧗‍♂️

**Payment**: Definitely the most challenging was to implement the payment function as I was having difficulties understanding Braintree's documentation, but after rereading, researching, many trial and error I figured it out! I was really happy with this one! For card number please use `4111 1111 1111 1111` and for the expiery date just use a future date exp: 05/25

[Payment file](https://github.com/lukacspapp/SEI-Project-4-Cicero/tree/main/lcodev/api/payment)

<img src='https://i.imgur.com/dVRz3se.png'>

**Time Management**: As I decided for this project to be a solo one, I knew in the beggining that I was not going to spend much time on the design but I have underestimated the time I had and that is why [User dahsbord](https://github.com/lukacspapp/SEI-Project-4-Cicero/blob/main/lcodev/front-end/src/user/UserDashBoard.js) is almost an empty component. Also when user is not logged in and is trying to put an item in a cart by pressing the 'Add to cart' button, in the console it says <code>Log In Please!</code> but does nothing else as I have run out of time.


## Wins 🏆

**Project**: I was very proud of myself for putting togeter an MVP in only 9 days with integrated payment, four models while learning a new CSS framework

**Bootsratp**: I had very little time to get use to another CSS framework but I found it similar to bulma. It was great to learn 3 different frameworks also it was a great learning for reading documentations again!



## Key Learnings 📝

* Python Fundamentals: As this was my first project using Python, I had the opportunity to solidify my understanding of it. 
* File Structuring: This was the first project when I started to have helper files so I can do larger functions and api calls outside of the main components so my code is much cleaner and more readable.
* React Hooks: After making two React apps, React Hooks introduced a new way of working. I enjoyed using it and will continue to use it in future projects.


## Future Improvements 🛠

**Filtering**: Filtering through name/category

**User Dashboards Page**: Displaying information about the user

**Display To Log In!**: When a user is trying to add something to the cart display 'Log In Please!' or redirect her/him to the Login Page.

**User Login & Profile**: The backend for this is all ready, so we could easily make an Instagram or Pinterest like profile page.
