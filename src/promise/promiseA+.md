# 要求

1. 一个 promise 有且只有一个状态 pending，fulfilled，rejected
2. peding

- 可以转换为 fulfilled | rejected

3. fulfilled

- 不能再变为其他状态
- 必须有一个 value 切不可改变

4. rejected

- 不能再转变状态
- 必须有一个 reason 且不可改变
