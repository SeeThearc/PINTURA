//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.13;

contract drive{
    struct Access{
        address user;
        bool access;
    }
    //for storing url of images uploaded
    mapping(address => string[]) value;
    // so that address 1 can share with address 2 so it will set to true
    mapping(address => mapping(address => bool))ownership;
    // when click share button we can see people whom we shared our image
    mapping(address => Access[])accessList;
    //as we are not using any database so we need to keep track of previous data so this mapping
    mapping(address => mapping(address => bool))previousData;

    function add(address _user,string memory url) external {
        value[_user].push(url);
    }

    function allow(address user) external{
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user]){
            for(uint256 i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]=true;
        }
    }

    function disallow(address user) external{
        ownership[msg.sender][user]=false;
        for(uint256 i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==user){
                accessList[msg.sender][i].access=false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory) {
        require(_user==msg.sender || ownership[_user][msg.sender],"You dont have Access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}