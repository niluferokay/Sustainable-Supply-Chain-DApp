pragma solidity >=0.4.22 <0.9.0;

contract Origin {

    uint public productCount = 0;
    uint public orderCount = 0;
    uint public shipmentCount = 0;
    address owner = 0x3421668462324bFB48EA07D0B12243091CD09759;

    mapping (uint => Product) public products; 
    mapping (uint => Order) public orders; 
    mapping (uint => Shipment) public shipments; 

    constructor() public {
    }
    
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    struct Product {
        uint id;
        string name;
        string image;
        string process;
        string date;
        address account;
    }

    event ProductAdded(
        uint id,
        string name,
        string image,
        string process,
        string date,
        address account
    );
   
    function addProduct(string memory _name, string memory _image, string memory _process, string memory _date) public onlyOwner {
        require(bytes(_name).length != 0);
        require(bytes(_image).length != 0);
        require(bytes(_process).length != 0);
        require(bytes(_date).length != 0);
        productCount++;
        products[productCount] = Product(productCount, _name,_image, _process, _date, msg.sender);
        emit ProductAdded(productCount, _name, _image, _process, _date, msg.sender);
    }

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
   
    function addOrder(string memory _name, string memory _quantity, string memory _unit, string memory _date) public onlyOwner {
        require(bytes(_name).length != 0);
        require(bytes(_quantity).length != 0);
        require(bytes(_unit).length != 0);
        require(bytes(_date).length != 0);
        orderCount++;
        orders[orderCount] = Order(orderCount, _name, _quantity, _unit, _date, msg.sender);
        emit OrderAdded(orderCount, _name, _quantity, _unit, _date, msg.sender);
    }   

    struct Shipment {
        uint id;
        string shipType;
        string place;
        string latlong;
        string date;
        address account;
        string product;
        string process;
    }

    event ShipmentAdded(
        uint id,
        string shipType,
        string place,
        string latlong,
        string date,
        address account,
        string product,
        string process
    );
   
    function addShipment(string memory _shipType, string memory _place,  string memory _latlong, 
    string memory _date, string memory _product, string memory _process) public {
        require(bytes(_shipType).length != 0);
        require(bytes(_latlong).length != 0);
        require(bytes(_date).length != 0);
        require(bytes(_product).length != 0);
        require(bytes(_process).length != 0);
        shipmentCount++;
        shipments[shipmentCount] = Shipment(shipmentCount, _shipType, _place, _latlong, _date, msg.sender, _product, _process);
        emit ShipmentAdded(shipmentCount, _shipType, _place, _latlong, _date, msg.sender, _product, _process);
    } 
    
}