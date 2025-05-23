import {
	Address,
} from '@graphprotocol/graph-ts'

import {
	Account,
	ERC20Contract,
	ERC20Balance,
} from '../../generated/schema'

import {
	ERC20,
} from '../../generated/StandardToken/ERC20'

import {
	constants,
} from '@amxx/graphprotocol-utils'

import {
	fetchAccount
} from '../helpers/account'

export function fetchERC20(address: Address): ERC20Contract {
	let contract = ERC20Contract.load(address)

	if (contract == null) {
		// let endpoint         = ERC20.bind(address)
		// let name             = endpoint.try_name()
		// let symbol           = endpoint.try_symbol()
		// let decimals         = endpoint.try_decimals()

		// Common
		contract             = new ERC20Contract(address)
		contract.name        = null
		contract.symbol      = null
		contract.decimals    = 18
		contract.totalSupply = fetchERC20Balance(contract as ERC20Contract, null).id
		contract.asAccount   = address
		contract.holders = 0
		contract.transfersCount = 0
		contract.mintCount = 0
		contract.burnCount = 0
		contract.save()

		let account          = fetchAccount(address)
		account.asERC20      = address
		account.save()
	} 

	return contract as ERC20Contract
}

export function fetchERC20Balance(contract: ERC20Contract, account: Account | null): ERC20Balance {
	let id      = contract.id.toHex().concat('/').concat(account ? account.id.toHex() : 'totalSupply')
	let balance = ERC20Balance.load(id)

	if (balance == null) {
		balance                 = new ERC20Balance(id)
		balance.contract        = contract.id
		balance.account         = account ? account.id : null
		balance.value           = constants.BIGDECIMAL_ZERO
		balance.valueExact      = constants.BIGINT_ZERO
		balance.save()
	}

	return balance as ERC20Balance
}
