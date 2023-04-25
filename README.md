## About
The Sustainable Supply Chain DApp is developed to measure the environmental and social performance of the supply chain. The information system is designed to collect data from supply chain actors, assess their environmental and social sustainability and transfer them to the relevant stakeholders for decision-making processes. At the same time, the blockchain system can be used to prove the origin of the products, track and trace the product journey throughout the supply chain and measure the product lifecycle inventory.

A DSS is composed of three components; a model base, a database, and a user interface. The model base component is a sustainability assessment model that calculates the environmental and social sustainability performance of the supply chain. It also does the life cycle inventory analysis of the product produced. The database is a blockchain database that stores the system inputs. The model runs on the user interface (UI) built on the React framework using JavaScript language. The UI allows users to run the sustainability model and presents the results in tables and charts. The user enters input data into the system. These can be the data for environmental and social sustainability, or life cycle inventory. When the data is entered, the user runs the sustainability model. Once the model is run, the data entered is uploaded to the blockchain database. The sustainability model retrieves the data from the blockchain database to calculate sustainability assessments and reports. After this step, the user can view the sustainability assessments in tables and charts. 

## System Architecture
<img src="https://user-images.githubusercontent.com/44509698/234395807-fe548331-02ab-4644-8938-9fe63077f22a.png" width="600">

Library | Version | Use
------------ | ------------- | -------------
Truffle | 5.3.5 | Compile/deploy/test contracts, Ganache for running local test node
Solidity | 0.5.16 | Compile contracts
Node | 16.17.0 | Build React UI
Web3 | 1.3.5 | Connect UI to EVM
React | 18.2.0 | User interface

## System Workflow
This diagram shows the different actors and their interactions with the system.
<img src="https://user-images.githubusercontent.com/44509698/234396591-c255ccd6-9d00-439b-bed3-ed1970f3aabf.jpg" width="1000">

In the assessments page, the focal company and its suppliers do the environmental, social assessments to measure their monthly or annual sustainability performance. 
<img src="https://user-images.githubusercontent.com/44509698/227777345-93a637b8-710e-470a-abdc-26c63749abf8.png" width="800">

The focal company enters information into the environmental assessment form. After submitting the assessment form, the system automatically calculates sustainability indicators.
<img src="https://user-images.githubusercontent.com/44509698/234398157-beb5eb14-d91e-4019-84af-854716af99c4.png" width="800"> 
<img src="https://user-images.githubusercontent.com/44509698/234396794-0e21629f-9204-43cc-837e-33f23017deb0.png" width="800"> 

The focal company or suppliers can display the environmental and social sustainability indicators with charts. In the charts, indicators are grouped according to similarities of their measurement units or their contexts. Also, in the chart section various sustainability assessments can be viewed at the same time or can be filtered by month or year. Thus, stakeholders can analyze and compare their past performances and evaluate their sustainability progress. 
<img src="https://user-images.githubusercontent.com/44509698/227777426-274c8fca-a181-453a-99c5-6e401831cfdc.png" width="800">
<img src="https://user-images.githubusercontent.com/44509698/234384044-3862be5b-68d0-476d-8623-953d8cc00e86.jpg" width="800">

When the focal company and all of its suppliers have completed their environmental and social assessments, the company creates orders. To create an order, the focal company first must create a digital record of the product. The image of the product is uploaded to IPFS.
<img src="https://user-images.githubusercontent.com/44509698/227777549-61a27643-3880-420b-8485-c350b5b89ad3.png" width="800">

After registering the product, the focal company creates an order. In this scenario, production of 1000 t-shirts are ordered. The permission to add products and orders is only given to the focal company.
<img src="https://user-images.githubusercontent.com/44509698/234399310-7c2d04db-2888-4572-903e-574b23d5b6eb.png" width="800">

Later, the suppliers’ send or receive the shipments of the order. When sending or receiving the shipments, each supplier selects the order and their production stage. As shipment is sent or received the real-time location (latitude and longitude), descriptive name of the location and the time information is obtained and displayed via Google API.

<img src="https://user-images.githubusercontent.com/44509698/234400211-8e04e1fa-30e3-44f8-b22f-8f4d800be65d.png" width="800">
<img src="https://user-images.githubusercontent.com/44509698/234400083-c3f05b9c-1e0b-4990-8232-9ca491e942e9.png" width="800">

The life cycle inventory for each product can be done after relevant production stages are completed. The company or the suppliers enter information to LCI form of the material flow for their production stage (Figure 27). After submitting the form, the system automatically calculates LCI indicators.

<img src="https://user-images.githubusercontent.com/44509698/234405656-7ce70961-4a52-4fac-8646-a510b124da20.png" width="800">

From the reports page, stakeholders can view the LCI analysis chart. All the product production stages are displayed in the x axis of each chart. With these informations stakeholders can detect inefficacies in their production processes and find out about the environmental impact of each production processes. 

<img src="https://user-images.githubusercontent.com/44509698/234405599-95fcea5e-6376-4e2c-b3d8-04c7ad638d57.png" width="800">

Finally, when the order is completed, customers can see the entire product journey; the shipment locations and time, production stages. They can also display the environmental footprint of each product and the environmental and social sustainability assessment of suppliers and the focal company. 

<img src="https://user-images.githubusercontent.com/44509698/227777379-5d3bcce2-d824-4133-955d-120c4c1a4a71.png" width="800">

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
