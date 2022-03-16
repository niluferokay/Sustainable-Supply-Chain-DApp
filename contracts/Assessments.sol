pragma solidity >=0.4.22 <0.9.0;

contract Assessments {
    
    uint public assessmentCount = 0; 

    mapping (uint => Assessment) public assessments;

    struct Assessment {
        uint id;
        string assessType;
        string date;
        address account;
        string document;
    }

    event AssessmentAdded(
        uint id,
        string assessType,
        string date,
        address account,
        string document
    );

    function addAssessment(
        string memory _assessType,
        string memory _date, 
        string memory _document
    ) public {
        require(bytes(_assessType).length != 0);
        require(bytes(_date).length != 0);
        require(bytes(_document).length != 0);
        assessmentCount++;
        assessments[assessmentCount] = Assessment(
            assessmentCount,
            _assessType,
            _date,
            msg.sender,
            _document);
        emit AssessmentAdded(
            assessmentCount,
            _assessType,
            _date,
            msg.sender,
            _document);
    }
}