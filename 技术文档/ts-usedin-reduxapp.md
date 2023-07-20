# 在react-app中使用typescript需要注意的一些  类型
### 项目地址： https://github.com/reduxjs/rtk-github-issues-example.git


> **store.ts**
```
import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
… …
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
```



> **rootReducer.ts**
```
export type RootState = ReturnType<typeof rootReducer>;
```

> **repoDetailsSlice.ts**
```
Import { createSlice, PayloadAction } from ‘@reduxjs/toolkit’;
```


> **RepoSearchForm.ts**
```
type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const RepoSearchForm = ({
  org,
  repo,
  setOrgAndRepo,
  setJumpToPage
}: Props) => {
  const [currentOrg, setCurrentOrg] = useState(org)
  const [currentRepo, setCurrentRepo] = useState(repo)
  const [currentPageText, setCurrentPageText] = useState('1')

  const onOrgChanged: ChangeHandler = e => {
    setCurrentOrg(e.target.value)
  }
return （
	<form>…</form>
）
}
```


> **issuesSlice.ts**
```
interface IssuesState {
  <<<
  issuesByNumber: Record<number, Issue>
  >>>
  
  currentPageIssues: number[]
  pageCount: number
  pageLinks: Links | null
  isLoading: boolean
  error: string | null
}

... ...

const issues = createSlice({
  name: 'issues',
  initialState: issuesInitialState,
  reducers: {
    getIssueStart: startLoading,
    getIssuesStart: startLoading,
    getIssueSuccess(state, { payload }: PayloadAction<Issue>) {
      const { number } = payload
      
      <<<
      state.issuesByNumber[number] = payload
      >>>
      
      state.isLoading = false
      state.error = null
    },
    getIssueFailure: loadingFailed,
    getIssuesFailure: loadingFailed
  }
})

```






----------
----------
----------
----------
----------
----------
>>> 以下为markdown语法测试，不用记忆：
----------

| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

八、表格
语法：

|表头|表头|表头|
|:---|:---:|---:|
|内容11111111111111|内容22222222222222222|内容3333333333|
|内容|内容|内容|

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略

----
###接口详情（id： 154923）：
###### 接口名称：    用户更新
###### 请求类型：    post
###### 请求url：   api/u/update
###### 接口描述：    用户信息更新，可更新的信息包括： avatar.gengder.age.nickname.breed

###请求参数列表
|变量名        |含义     |类型     |备注********     |
|-----|:---:|:-----:|:------:|
|       user           |用户信息|object  |      |

|age //1-100|用户年龄|number|无        |
|:-------:|:-----:|------:|:------:|
|avatar |用户头像|string|@mock=@IMG(200*200)|
|gender//1|性别|string|@mock=['男', '女']|
|nickname//3-5|昵称|string| @mock='测试用户'|

###响应参数列表
|变量名 |含义 |类型 |备注******** |
|-----|:---:|:-----:|:------:|
|data|        |object  |     |
|age //1-100|用户年龄|number|        |
|avatar |用户头像|string|@mock=@IMG(200*200)|
|gender//1|性别|string|@mock=['男', '女']|
|nickname//3-5|昵称|string| @mock='测试用户'|
|success|更新操作成功与否|boolean| @mock=true|

----





十、流程图

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&
```



##  十一 水平线

___

---

***


```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
```

```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
```


