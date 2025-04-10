// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class Unknown extends ethereum.Event {
  get params(): Unknown__Params {
    return new Unknown__Params(this);
  }
}

export class Unknown__Params {
  _event: Unknown;

  constructor(event: Unknown) {
    this._event = event;
  }

  get param0(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get param1(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class TokenRegistry extends ethereum.SmartContract {
  static bind(address: Address): TokenRegistry {
    return new TokenRegistry("TokenRegistry", address);
  }
}
