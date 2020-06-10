enum StatusEnum {
  "pending",
  "fulfilled",
  "rejected",
}

class Promise {
  status: StatusEnum = StatusEnum.pending;
  value: any = void 0;
  fulfilledList = [];
  rejectList = [];

  constructor(callBackFun) {
    if (typeof callBackFun !== "function") {
      throw new Error("error");
    }

    try {
      callBackFun(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  resolve(val) {
    if (this.status !== StatusEnum.pending) {
      return;
    }
    this.status = StatusEnum.fulfilled;
    this.value = val;
  }

  reject(err) {
    if (this.status !== StatusEnum.pending) {
      return;
    }
    this.status = StatusEnum.rejected;
    this.value = err;
  }

  then(res, rej) {
    const { value, status } = this;

    switch (status) {
      case StatusEnum.pending:
        this.fulfilledList.push(res);
        this.rejectList.push(rej);
      case StatusEnum.fulfilled:
        res(value);
      case StatusEnum.rejected:
        rej(value);
    }

    return new Promise(())
  }
}

export default Promise;
