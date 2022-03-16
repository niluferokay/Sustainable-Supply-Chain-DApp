pragma solidity >=0.4.22 <0.9.0;

contract Origin {

    uint public productCount = 0;
    uint public orderCount = 0;
    uint public certificateCount = 0;
    uint public shipmentCount = 0;

    mapping (uint => Product) public products; 
    mapping (uint => Order) public orders; 
    mapping (uint => Certificate) public certificates; 
    mapping (uint => Shipment) public shipments; 
    //put on the blockchain when inserted into the mapping

    struct Product {
        uint id;
        string name;
        string image;
        string company;
        string date;
        address account;
    }

    event ProductAdded(
        uint id,
        string name,
        string image,
        string company,
        string date,
        address account
    );
   
    function addProduct(string memory _name, string memory _image, string memory _company, string memory _date) public {
        //Require name and company
        require(bytes(_name).length != 0);
        require(bytes(_image).length != 0);
        require(bytes(_company).length != 0);
        require(bytes(_date).length != 0);
        //Make sure parameters are correct
        //Increment product count
        productCount++;
        // Add the product
        products[productCount] = Product(productCount, _name,_image, _company, _date, msg.sender);
        //Trigger an event
        emit ProductAdded(productCount, _name, _image, _company, _date, msg.sender);
        // }
    }

//     function deleteProduct(uint _productId) public returns(bool success) {
//         require(productCount > 0);
//         for(uint256 i =0; i< productCount; i++){
//            if(products[i].id == _productId){
//               products[i] = products[productCount-1];} // pushing last into current arrray index which we gonna delete
//               delete products[productCount-1]; // now deleteing last index
//               productCount--; //total count decrease
//               //emit event
//               return true;
//            }
//        return false;
//    }

    struct Order {
        uint id;
        string name;
        string quantity;
        string unit;
        string date;
        address account;
    }

    event OrderAdded(
        uint id,
        string name,
        string quantity,
        string unit,
        string date,
        address account
    );
   
    function addOrder(string memory _name, string memory _quantity, string memory _unit, string memory _date) public {
        //Require name and company
        require(bytes(_name).length != 0);
        require(bytes(_quantity).length != 0);
        require(bytes(_unit).length != 0);
        require(bytes(_date).length != 0);
        // require(bytes(msg.sender).length != 0);
        //Make sure parameters are correct
        //Increment product count
        orderCount++;
        // Add the order
        orders[orderCount] = Order(orderCount, _name, _quantity, _unit, _date, msg.sender);
        //Trigger an event
        emit OrderAdded(orderCount, _name, _quantity, _unit, _date, msg.sender);
        // }
    }   
 
    struct Certificate {
        uint id;
        string name;
        string file;
        string date;
        address account;
    }

    event CertificateAdded(
        uint id,
        string name,
        string file,
        string date,
        address account
    );
   
    function addCertificate(string memory _name, string memory _file, string memory _date) public {
        require(bytes(_name).length != 0);
        require(bytes(_file).length != 0);
        require(bytes(_date).length != 0);
        certificateCount++;
        certificates[certificateCount] = Certificate(certificateCount, _name, _file, _date, msg.sender);
        emit CertificateAdded(certificateCount, _name, _file, _date, msg.sender);
        // }
    }   

    struct Shipment {
        uint id;
        string shipType;
        string place;
        string latitude;
        string longitude;
        string date;
        address account;
    }

    event ShipmentAdded(
        uint id,
        string shipType,
        string place,
        string latitude,
        string longitude,
        string date,
        address account
    );
   
    function addShipment(string memory _shipType, string memory _place,  string memory _latitude, string memory _longitude, string memory _date) public {
        require(bytes(_shipType).length != 0);
        require(bytes(_place).length != 0);
        require(bytes(_latitude).length != 0);
        require(bytes(_longitude).length != 0);
        require(bytes(_date).length != 0);
        shipmentCount++;
        shipments[shipmentCount] = Shipment(shipmentCount, _shipType, _place, _latitude, _longitude, _date, msg.sender);
        emit ShipmentAdded(shipmentCount, _shipType, _place, _latitude, _longitude, _date, msg.sender);
        // }
    }   
    
}