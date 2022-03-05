pragma solidity >=0.4.22 <0.9.0;

contract Assessment {
    
    uint public assessmentCount = 0; 

    mapping (uint => Assessment) public assessments;

    struct Assessment {
        uint id;
        string assessType;
        string document;
        string date;
        string account;
    }

    event AssessmentAdded(
        uint id,
        string assessType,
        string document,
        string date,
        string account
    );

    function addAssessment(
        string memory _assessType, 
        string memory _document,
        string memory _date,
        string memory _account
    ) public {
        require(bytes(_assessType).length != 0);
        require(bytes(_document).length != 0);
        require(bytes(_date).length != 0);
        require(bytes(_account).length != 0);
        assessmentCount++;
        assessments[assessmentCount] = Assessment(
            assessmentCount,
            _assessType,
            _document,
            _date,
            _account);
        emit AssessmentAdded(
            assessmentCount,
            _assessType,
            _document,
            _date,
            _account);
    }
}