API Endpoints
 For users:
    /createUsers   
    /getAllUsers
    /authenticate
    /:id/editUsers
    /:id/getUser
    /:id/deletetUser
    /authenticate

 *For products:
   
 *For users:  

<!-- data base shapes -->

 Database Shapes:

 *Product:

    productid
    productname
    productcategory
    productexpirationdate

 *users:
    
    userid
    username
    userfirstname
    userlastname
    useremail
    userpassword

 *orders
    orderid
    userid [FK]
    productid [FK]
    totalprice
    orderdate


       
