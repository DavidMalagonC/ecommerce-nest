export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
  ) { }
}

export class Purchase {
  constructor(
    private _id: string,
    private _direction: string,
    private _idUser: string,
    private _observations: string,
    private _payment: string,
    private _products: Product[] = [],
    private _status: string,
    private _total: number,
    private _validatePayment: boolean = false,
  ) { }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get direction(): string {
    return this._direction;
  }

  set direction(value: string) {
    this._direction = value;
  }

  get idUser(): string {
    return this._idUser;
  }

  set idUser(value: string) {
    this._idUser = value;
  }

  get observations(): string {
    return this._observations;
  }

  set observations(value: string) {
    this._observations = value;
  }

  get payment(): string {
    return this._payment;
  }

  set payment(value: string) {
    this._payment = value;
  }

  get products(): Product[] {
    return this._products;
  }

  set products(value: Product[]) {
    this._products = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get validatePayment(): boolean {
    return this._validatePayment;
  }

  set validatePayment(value: boolean) {
    this._validatePayment = value;
  }

  toJSON() {
    return {
      id: this._id,
      direction: this._direction,
      idUser: this._idUser,
      observations: this._observations,
      payment: this._payment,
      products: this._products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
      status: this._status,
      total: this._total,
      validatePayment: this._validatePayment,
    };
  }
}
