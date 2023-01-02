API Endpoints
 For users:
    /createUsers   
    /getAllUsers
    /:id/editUsers
    /:id/getUser
    /:id/deletetUser
    /authenticate

 *For products:
         /createproduct
          /getAllproducts
          /:id/editproducts
          /:id/getproduct
          /:id/deletetproduct
 *For orders:  
           /createorder
          /getAllorders
          /:id/editorders
          /:id/getorder
          /:id/deletetorder

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


       
