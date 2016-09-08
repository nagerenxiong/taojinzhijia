'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    this.assign("title", "注册")
      //判断是否登陆
    return this.display();
    //判断是否登陆
  }
  async redirectAction() {
    return this.display();
  }
  async doregisterAction() {
    let data = this.post();
    let username = data.username;
    let md5Pas = await think.md5(data.password);
    let result = await this.model("user").addUser({
      name: username,
      password: md5Pas
    }, {
      name: username
    });
    let info = {
      name: username,
      password: md5Pas
    }
    if (result.type == "add") {
      this.assign("title", "注册成功");
      await this.session("userInfo", info);
    } else {
      this.assign("title", "注册失败");
    }
    this.assign("result", result)
    return this.display("register");
  }
}
