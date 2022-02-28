<template>
  <div>
    <h3>对不同接口异常进行分别处理</h3>
    <pre>
      doSomething1()
      .then(doSomething2)
      .then(doSomething3)
      .catch(err => console.error(err))
      你怎么知道错误发生在哪里? 你并不知道
    </pre>
    <h3>同时请求2个接口 且第二个接口参数依赖第一个接口返回参数的报错区分处理</h3>
    <pre>
    doSomething1()
      .then(() => {
        return doSomething2().catch(err => {
          //处理错误
          throw err //打断链条
        })
      })
      .then(() => {
        return doSomething2().catch(err => {
          //处理错误
          throw err //打断链条
        })
      })
      .catch(err => console.error(err))
    </pre>
  </div>
</template>
