pragma solidity >=0.4.22 <0.9.0;

contract Assessments {
    
    uint public LCICount = 0; 
    uint public enviroCount = 0; 
    uint public socialCount = 0; 
    uint public assessmentCount = 0; 

    mapping (uint => LCI) public LCIs;
    mapping (uint => Enviro) public enviros;
    mapping (uint => Social) public socials;

    struct LCI {
        uint id;
        string assessType;
        string date;
        address account;
        string document;
        string month;
        string year;
        string process;
    }

    event LCIAdded(
        uint id,
        string assessType,
        string date,
        address account,
        string document,
        string month,
        string year,
        string process
    );

    struct Enviro {
        uint id;
        string assessType;
        string date;
        address account;
        string document;
        string month;
        string year;
    }

    event EnviroAdded(
        uint id,
        string assessType,
        string date,
        address account,
        string document,
        string month,
        string year
    );

    struct Social {
        uint id;
        string assessType;
        string date;
        address account;
        string document;
        string month;
        string year;
    }

    event SocialAdded(
        uint id,
        string assessType,
        string date,
        address account,
        string document,
        string month,
        string year
    );

    function addLCI(
        string memory _date, 
        string memory _document,
        string memory _month,
        string memory _year,
        string memory _process
    ) public {
        require(bytes(_date).length != 0);
        require(bytes(_document).length != 0);
        require(bytes(_process).length != 0);
        LCICount++;
        assessmentCount++;
        LCIs[LCICount] = LCI(
            LCICount,
            "Life Cycle Inventory",
            _date,
            msg.sender,
            _document,
            _month,
            _year,
            _process);
        emit LCIAdded(
            LCICount,
            "Life Cycle Inventory",
            _date,
            msg.sender,
            _document,
            _month,
            _year,
            _process);
    }
    function addEnviro(
        string memory _date, 
        string memory _document,
        string memory _month,
        string memory _year
    ) public {
        require(bytes(_date).length != 0);
        require(bytes(_document).length != 0);
        require(bytes(_month).length != 0);
        require(bytes(_year).length != 0);
        enviroCount++;
        assessmentCount++;
        enviros[enviroCount] = Enviro(
            enviroCount,
            "Environmental Assessment",
            _date,
            msg.sender,
            _document,
            _month,
            _year);
        emit EnviroAdded(
            enviroCount,
            "Environmental Assessment",
            _date,
            msg.sender,
            _document,
            _month,
            _year);
    }
    function addSocial(
        string memory _date, 
        string memory _document,
        string memory _month,
        string memory _year
    ) public {
        require(bytes(_date).length != 0);
        require(bytes(_document).length != 0);
        require(bytes(_month).length != 0);
        require(bytes(_year).length != 0);
        socialCount++;
        assessmentCount++;
        socials[socialCount] = Social(
            socialCount,
            "Social Assessment",
            _date,
            msg.sender,
            _document,
            _month,
            _year);
        emit SocialAdded(
            socialCount,
            "Social Assessment",
            _date,
            msg.sender,
            _document,
            _month,
            _year);
    }
}