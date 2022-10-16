import {post,get,put,del} from "./service"
export const loginApi=data=>{
    return post({
        url:"/login",
        data
    })
}
export const userListApi=data=>{
    return get({
        url:"/users",
        data
    })
}
// 添加用户
export const userAddApi=data=>{
    return post({
        url:"/users",
        data
    })
}
// 状态更改
export const userChangeStateApi=data=>{
    return put({
        url:`users/${data.id}/state/${data.mg_state}`,
        data
    })
}
// 编辑用户
export const userChangeinfoApi=data=>{
    return put({
        url:`users/${data.id}`,
        data
    })
}
// 删除用户
export const userDeleteApi=data=>{
    return del({
        url:`users/${data.id}`
    })
}
// 角色列表
export const getRolesApi=data=>{
    return get({
        url:`roles`,
        data
    })
}
// 新建角色
export const rolesAddApi=data=>{
    return post({
        url:`roles`,
        data
    })
}
// 编辑角色
export const rolesChangeApi=data=>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}
// 删除角色
export const rolesDeleteApi=data=>{
    return del({
        url:`roles/${data.id}`,
        data
    })
}
// 商品列表
export const goodsListApi=data=>{
    return get({
        url:`goods`,
        data
    })
}