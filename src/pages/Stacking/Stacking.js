import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';

import StackItem from './StackingItem';
import P from '../../components/P';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import appStore from '../../store/app.store';

import errorOutlineIcon from '../../assets/svg/error_outline.svg';
import pieChartOutlineIcon from '../../assets/svg/pie_chart_outline.svg';
import last24hIcon from '../../assets/svg/last24h.svg';
import copyIcon from '../../assets/svg/copy.svg';
import storageService from '../../services/storage.service';
const Stacking = observer(() => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const { ethereum } = window;
  const pools = [
    {
      contractName: 'Pool',
      updatedAt: '2021-09-21T12:48:57.348Z',
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          name: '_nodes',
          outputs: [
            {
              name: 'node',
              type: 'address',
            },
            {
              name: 'stake',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'nodeType',
          outputs: [
            {
              name: '',
              type: 'uint8',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'nodeStake',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'owner',
          outputs: [
            {
              name: '',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'minStakeValue',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              name: 'poolNodeType',
              type: 'uint8',
            },
            {
              name: 'poolNodeStake',
              type: 'uint256',
            },
            {
              name: 'poolMinStakeValue',
              type: 'uint256',
            },
            {
              name: 'manager',
              type: 'address',
            },
          ],
          payable: true,
          stateMutability: 'payable',
          type: 'constructor',
        },
        {
          payable: true,
          stateMutability: 'payable',
          type: 'fallback',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              name: 'pool',
              type: 'address',
            },
            {
              indexed: false,
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              name: 'stake',
              type: 'int256',
            },
          ],
          name: 'PoolStakeChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              name: 'pool',
              type: 'address',
            },
            {
              indexed: false,
              name: 'reward',
              type: 'uint256',
            },
          ],
          name: 'PoolReward',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'previousOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipRenounced',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          constant: false,
          inputs: [],
          name: 'stake',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'tokens',
              type: 'uint256',
            },
          ],
          name: 'unstake',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'viewStake',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getFee',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'fee',
              type: 'uint256',
            },
          ],
          name: 'setFee',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getTotalStake',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getTokenPrice',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
      bytecode:
        '0x60806040526040516080806200338383398101806040528101908080519060200190929190805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508234141515610122576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001807f53656e642076616c7565206e6f7420657175616c73206e6f6465207374616b6581526020017f2076616c7565000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60008211151561019a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f506f6f6c206d696e207374616b652076616c7565206973207a65726f0000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561023f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f4d616e616765722063616e206e6f74206265207a65726f00000000000000000081525060200191505060405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061028861031f565b604051809103906000f0801580156102a4573d6000803e3d6000fd5b50600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600460006101000a81548160ff0219169083600381111561030357fe5b0217905550826005819055508160068190555050505050610330565b6040516117f98062001b8a83390190565b61184a80620003406000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806304636349146100d25780632e17de78146100fd5780632e7d754b1461012a5780633a4b66f11461019e5780633fa9a8de146101bc5780634b94f50e146101f5578063611a212e1461022057806369fe0e2d1461024b578063715018a6146102785780637bc742251461028f5780638da5cb5b146102ba578063a8d6e68e14610311578063ced72f871461033c578063f2fde38b14610367575b005b3480156100de57600080fd5b506100e76103aa565b6040518082815260200191505060405180910390f35b34801561010957600080fd5b50610128600480360381019080803590602001909291905050506104a9565b005b34801561013657600080fd5b5061015560048036038101908080359060200190929190505050610985565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6101a66109d8565b6040518082815260200191505060405180910390f35b3480156101c857600080fd5b506101d1610dd9565b604051808260038111156101e157fe5b60ff16815260200191505060405180910390f35b34801561020157600080fd5b5061020a610dec565b6040518082815260200191505060405180910390f35b34801561022c57600080fd5b50610235610dfb565b6040518082815260200191505060405180910390f35b34801561025757600080fd5b5061027660048036038101908080359060200190929190505050610e01565b005b34801561028457600080fd5b5061028d610e85565b005b34801561029b57600080fd5b506102a4610f87565b6040518082815260200191505060405180910390f35b3480156102c657600080fd5b506102cf61107c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561031d57600080fd5b506103266110a1565b6040518082815260200191505060405180910390f35b34801561034857600080fd5b506103516110a7565b6040518082815260200191505060405180910390f35b34801561037357600080fd5b506103a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061110c565b005b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561046957600080fd5b505af115801561047d573d6000803e3d6000fd5b505050506040513d602081101561049357600080fd5b8101908080519060200190929190505050905090565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561056957600080fd5b505af115801561057d573d6000803e3d6000fd5b505050506040513d602081101561059357600080fd5b810190808051906020019092919050505083111515156105b257600080fd5b6105ba611173565b91506105cf83836114bf90919063ffffffff16565b905060035481111515156105e257600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639dc29fac33856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1580156106a757600080fd5b505af11580156106bb573d6000803e3d6000fd5b505050505b803073ffffffffffffffffffffffffffffffffffffffff1631101561087c57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639e6371ba600760016007805490500381548110151561073457fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1580156107e457600080fd5b505af11580156107f8573d6000803e3d6000fd5b505050506040513d602081101561080e57600080fd5b810190808051906020019092919050505050600760016007805490500381548110151561083757fe5b9060005260206000209060020201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550506106c0565b610891816003546114f790919063ffffffff16565b6003819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156108dd573d6000803e3d6000fd5b507f223564f6687a7ec996f252d9dc5ee350682c16afe7436f0c2155893a454aab39303383600003604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a1505050565b60078181548110151561099457fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000806000806006543410151515610a58576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f506f6f6c3a207374616b652076616c756520746f6f6c206c6f7700000000000081525060200191505060405180910390fd5b610a60611173565b9250610a75833461151090919063ffffffff16565b9150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015610b3c57600080fd5b505af1158015610b50573d6000803e3d6000fd5b50505050610b693460035461152690919063ffffffff16565b6003819055507f223564f6687a7ec996f252d9dc5ee350682c16afe7436f0c2155893a454aab39303334604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a16005543073ffffffffffffffffffffffffffffffffffffffff1631101515610dd057600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166330e9fe78600554600460009054906101000a900460ff166040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180826003811115610cbc57fe5b60ff1681526020019150506020604051808303818588803b158015610ce057600080fd5b505af1158015610cf4573d6000803e3d6000fd5b50505050506040513d6020811015610d0b57600080fd5b81019080805190602001909291905050509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610dc3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f4e6f6465206465706c6f79206572726f7200000000000000000000000000000081525060200191505060405180910390fd5b610dcf81600554611542565b5b81935050505090565b600460009054906101000a900460ff1681565b6000610df6611613565b905090565b60055481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e5c57600080fd5b60008110158015610e705750620f42408111155b1515610e7b57600080fd5b8060088190555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ee057600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008060008090505b60078054905081101561101657611007600782815481101515610faf57fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16318361152690919063ffffffff16565b91508080600101915050610f90565b600060085411156110605761105d61104e620f4240611040600854866114bf90919063ffffffff16565b61151090919063ffffffff16565b836114f790919063ffffffff16565b91505b6110758260035461152690919063ffffffff16565b9250505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561110457600080fd5b600854905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561116757600080fd5b611170816116f4565b50565b600080600080600091505b60078054905082101561128b5761127c60078381548110151561119d57fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ccfd60b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561123257600080fd5b505af1158015611246573d6000803e3d6000fd5b505050506040513d602081101561125c57600080fd5b81019080805190602001909291905050508461152690919063ffffffff16565b9250818060010192505061117e565b60006008541115611340576112c0620f42406112b2600854866114bf90919063ffffffff16565b61151090919063ffffffff16565b90506112d581846114f790919063ffffffff16565b92506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561133e573d6000803e3d6000fd5b505b6113558360035461152690919063ffffffff16565b6003819055507fc6bf735d182786c286ab49e5279eaebd4fc5a4cf8b6eae1dd5caa8c27e022eba3084604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600060035411156114ad576114a6600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561145a57600080fd5b505af115801561146e573d6000803e3d6000fd5b505050506040513d602081101561148457600080fd5b810190808051906020019092919050505060035461151090919063ffffffff16565b93506114b9565b670de0b6b3a764000093505b50505090565b6000808314156114d257600090506114f1565b81830290508183828115156114e357fe5b041415156114ed57fe5b8090505b92915050565b600082821115151561150557fe5b818303905092915050565b6000818381151561151d57fe5b04905092915050565b6000818301905082811015151561153957fe5b80905092915050565b61154a6117ee565b82816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050818160200181815250506007819080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505050505050565b60006116ef600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561169e57600080fd5b505af11580156116b2573d6000803e3d6000fd5b505050506040513d60208110156116c857600080fd5b81019080805190602001909291905050506116e1610f87565b61151090919063ffffffff16565b905090565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561173057600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6040805190810160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815250905600a165627a7a72305820171c6d00ce765279d49808b4203b2f2684f2ddf6b87cdde964928e4332f842620029608060405233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506117a5806100546000396000f3006080604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b3146100ca57806318160ddd1461012f57806323b872dd1461015a57806340c10f19146101df578063661884631461022c57806370a0823114610291578063715018a6146102e85780638da5cb5b146102ff5780639dc29fac14610356578063a9059cbb146103a3578063d73dd62314610408578063dd62ed3e1461046d578063f2fde38b146104e4575b600080fd5b3480156100d657600080fd5b50610115600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610527565b604051808215151515815260200191505060405180910390f35b34801561013b57600080fd5b50610144610619565b6040518082815260200191505060405180910390f35b34801561016657600080fd5b506101c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610623565b604051808215151515815260200191505060405180910390f35b3480156101eb57600080fd5b5061022a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109de565b005b34801561023857600080fd5b50610277600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a49565b604051808215151515815260200191505060405180910390f35b34801561029d57600080fd5b506102d2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610cdb565b6040518082815260200191505060405180910390f35b3480156102f457600080fd5b506102fd610d23565b005b34801561030b57600080fd5b50610314610e28565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561036257600080fd5b506103a1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610e4e565b005b3480156103af57600080fd5b506103ee600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610eb8565b604051808215151515815260200191505060405180910390f35b34801561041457600080fd5b50610453600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d8565b604051808215151515815260200191505060405180910390f35b34801561047957600080fd5b506104ce600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112d4565b6040518082815260200191505060405180910390f35b3480156104f057600080fd5b50610525600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061135b565b005b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561067257600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156106fd57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561073957600080fd5b61078a826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061081d826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506108ee82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a3a57600080fd5b610a4482826113f8565b505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610b5b576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610bef565b610b6e83826113c390919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d7f57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610eaa57600080fd5b610eb48282611518565b5050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610f0757600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610f4357600080fd5b610f94826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611027826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061116982600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113b757600080fd5b6113c08161167d565b50565b60008282111515156113d157fe5b818303905092915050565b600081830190508281101515156113ef57fe5b80905092915050565b600061140f826001546113dc90919063ffffffff16565b600181905550611466826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115151561156557600080fd5b6115b6816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061160d816001546113c390919063ffffffff16565b600181905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156116b957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820e818ffab9283bc35d10b04d5e336cbcd8a82476c6b5a10155d98e2504fc425880029',
    },
  ];

  useEffect(async () => {
    if (storageService.get('auth') === true) {
      if (ethereum && ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();
        provider.listAccounts().then((accounts) => {
          const defaultAccount = accounts[0];
          if (defaultAccount) {
            setAccount(defaultAccount);
            provider.getBalance(defaultAccount).then((balanceObj) => {
              const balanceInEth = ethers.utils.formatEther(balanceObj);
              setBalance(balanceInEth);
            });
          }
        });
      }
    }
  }, [appStore, account, balance]);

  const infoBlock = (
    <div className="info-block ">
      <div className="wrapper">
        <div className="info-block__address">
          <P size="m-400" style={{ paddingBottom: 5 }}>
            My Address
          </P>
          <P size="xl-400" style={{ color: '#333333' }}>
            {account && account}
            <ReactSVG
              data-tip
              data-for="copy-state"
              onClick={onCopy}
              src={copyIcon}
              wrapper="span"
              style={{ marginLeft: 20, cursor: 'pointer' }}
            />
          </P>
          {!isCopied ? (
            <ReactTooltip id="copy-state" place="top" effect="solid">
              Copy to clipboard
            </ReactTooltip>
          ) : (
            <ReactTooltip id="copy-state" place="top" effect="solid">
              Copied
            </ReactTooltip>
          )}
        </div>
        <div className="info-block__stacked">
          <div className="info-block__stacked--total">
            <div>
              <ReactTooltip id="total-staked" place="top" effect="solid">
                Total Staked info
              </ReactTooltip>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ReactSVG
                    style={{
                      paddingTop: 1,
                    }}
                    src={pieChartOutlineIcon}
                    wrapper="span"
                  />
                  <P size="m-400" style={{ paddingBottom: 5 }}>
                    &nbsp;Total Staked&nbsp;
                  </P>
                </div>
                <ReactSVG
                  data-tip
                  data-for="total-staked"
                  style={{
                    paddingTop: 3,
                  }}
                  src={errorOutlineIcon}
                  wrapper="span"
                />
              </div>
            </div>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              13.5 m AMB
            </P>
          </div>
          <div className="info-block__stacked--course">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ReactSVG
                style={{
                  paddingTop: 3,
                }}
                src={last24hIcon}
              />
              <P size="m-400" style={{ paddingBottom: 5 }}>
                &nbsp;Last 24 Hours
              </P>
            </div>

            <P size="xl-400" style={{ color: '#4A38AE' }}>
              <span style={{ color: '#1ACD8C' }}> +3663 AMB </span>&nbsp; / 34$
            </P>
          </div>
        </div>
      </div>
    </div>
  );
  return appStore.auth ? (
    <>
      {account && infoBlock}
      <div className="stacking wrapper">
        <div className="stacking__header">
          <div style={{ flexBasis: 64 }}>Pool</div>
          <div style={{ flexBasis: 26 }}>My Stake</div>
          <div style={{ flexBasis: 29 }}>Total staked</div>
          <div style={{ flexBasis: 26 }}>Net APY</div>
          <div style={{ maxWidth: 167, marginRight: -6 }} />
        </div>
        {pools.map((pool) => (
          <StackItem
            key="test"
            availableForStake={balance}
            expand
            lazy
            poolInfo={pool}
          />
        ))}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
});

export default Stacking;
