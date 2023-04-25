## About
The Supply Chain DApp is developed to measure the environmental and social performance of the supply chain. The information system is designed to collect data from supply chain actors, assess their environmental and social sustainability and transfer them to the relevant stakeholders. At the same time, the blockchain system can be used to prove the origin of the products, track and trace the product journey throughout the supply chain and measure the product lifecycle inventory.

A blockchain-based quantitative sustainability measurement model is created for decision-making processes. The model aims to assess the environmental and social sustainability performance of the supply chain actors. These actors can be suppliers, manufacturers, logistic companies, and focal companies such as retailers, wholesalers and distributors. Furthermore, the framework measures the environmental impact of the manufactured product with life cycle inventory (LCI) analysis. 

A DSS is composed of three components; a model base, a database, and a user interface. The model base component is a sustainability assessment model that calculates the environmental and social sustainability performance of the supply chain. It also does the life cycle inventory analysis of the product produced. The database is a blockchain database that stores the system inputs. The model runs on the user interface (UI) built on the React framework using JavaScript language. The UI allows users to run the sustainability model and presents the results in tables and charts. The user enters input data into the system. These can be the data for environmental and social sustainability, or life cycle inventory. The environmental and social dimensions are taken into account as they are less considered compared to the economic dimension when measuring organizational sustainability. When the data is entered, the user runs the sustainability model. Once the model is run, the data entered is uploaded to the blockchain database. The sustainability model retrieves the data from the blockchain database to calculate sustainability assessments and reports. After this step, the user can view the sustainability assessments in tables and charts. 

## System Architecture
<img src="https://user-images.githubusercontent.com/44509698/234380014-4a1c274c-407c-48d0-b769-af8dd31de1a8.png" width="600">

Library | Version | Use
------------ | ------------- | -------------
Truffle | 5.3.5 | Compile/deploy/test contracts, Ganache for running local test node
Solidity | 0.5.16 | Compile contracts
Node | 16.17.0 | Build React UI
Web3 | 1.3.5 | Connect UI to EVM
React | 18.2.0 | User interface

## System Workflow
This diagram shows the different actors and their interactions with the system.
<img src="https://user-images.githubusercontent.com/44509698/227777313-f9f15f52-ff50-4f7e-b249-36787affe8a8.png" width="800">

## Screenshots
<img src="https://user-images.githubusercontent.com/44509698/227777345-93a637b8-710e-470a-abdc-26c63749abf8.png" width="800">
In the assessments page, the focal company and its suppliers do the environmental, social assessments to measure their monthly or annual sustainability performance. 
<img src="https://user-images.githubusercontent.com/44509698/227777549-61a27643-3880-420b-8485-c350b5b89ad3.png" width="800">
<img src="https://user-images.githubusercontent.com/44509698/234381767-28073845-aa42-4b85-921b-50d876494e8d.png" width="800"> <img src="https://user-images.githubusercontent.com/44509698/234382124-c03adfc3-db14-4a08-b640-407617ccd839.png width="800"> 
The focal company enters information into the environmental assessment form. After submitting the assessment form, the system automatically calculates sustainability indicators. 
<img src="https://user-images.githubusercontent.com/44509698/227777426-274c8fca-a181-453a-99c5-6e401831cfdc.png" width="800">
The focal company or suppliers can display the environmental and social sustainability indicators with charts (Figure 18 and 19). In the charts, indicators are grouped according to similarities of their measurement units or their contexts. Also, in the chart section various sustainability assessments can be viewed at the same time or can be filtered by month or year. Thus, stakeholders can analyze and compare their past performances and evaluate their sustainability progress. 
<img src="https://user-images.githubusercontent.com/44509698/227777379-5d3bcce2-d824-4133-955d-120c4c1a4a71.png" width="800">
<img src="https://user-images.githubusercontent.com/44509698/227777549-61a27643-3880-420b-8485-c350b5b89ad3.png" width="800">
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
