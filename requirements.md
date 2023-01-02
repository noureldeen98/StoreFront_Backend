API Endpoints
 After running open your browser and write this URL 
   for users:
   http://localhost:10000/sotreFront/api/users/ then the following endpoints:
          createUser
          getAllUsers
          authenticate
          :id/editUsers
          :id/getUser
          :id/deletetUser

  for products:
   http://localhost:10000/sotreFront/api/products/ then the following endpoints:
          createproduct
          getAllproducts
          :id/editproducts
          :id/getproduct
          :id/deletetproduct

  for orders:
   http://localhost:10000/sotreFront/api/orders/ then the following endpoints:
          createorder
          getAllorders
          :id/editorders
          :id/getorder
          :id/deletetorder

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


       
