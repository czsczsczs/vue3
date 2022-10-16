<template>
    <div>
        <div>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        <div class="page_content">
            <div class="flex">
                    <div class="input_button">
                        <el-input
                        v-model="searchParams.query"
                        placeholder="请输入商品名"
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button @click="searchList">
                                <el-icon><Search /></el-icon>
                            </el-button>
                        </template>
                        </el-input>
                    </div>
            </div>
                <el-table
                    :data="goodsList"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="goods_name" label="商品名称" width="180" />
                    <el-table-column prop="goods_price" label="价格" width="180" />
                    <el-table-column prop="goods_number" label="数量" />
                    <el-table-column prop="goods_weight" label="重量" />
                    <el-table-column prop="goods_state" label="商品状态">
                        <template #default="scope">
                            <p>{{goodsstate(scope.row.goods_state)}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hot_mumber" label="热销品数量"/>
                    </el-table>
                        <el-pagination
                            v-model:currentPage="searchParams.pagenum"
                            v-model:page-size="searchParams.pagesize"
                            :page-sizes="[2,5,10,20]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            @size-change="searchList"
                            @current-change="searchList"
                            />
        </div>
    </div>
</template>
<script>
import { reactive,toRefs,ref } from 'vue'
import {goodsListApi} from "../../util/request"
export default{
    name:"goods",
    setup() {
        const data=reactive({
            keyWord:"",
            searchParams:{
                query:"",
                pagenum:1,
                pagesize:5
            },
            total:0,
            goodsList:[],
        })
        const searchList=()=>{
            
            goodsListApi(data.searchParams).then(res=>{
                if(res.data){
                    data.goodsList=res.data.goods
                    data.total=res.data.total
                }
            })
        }
        const goodsstate=(row)=>{
            switch (row) {
                case 0:
                    return "未通过"
                    break;
                case 1:
                    return "审核中"
                    break;
                case 2:
                    return "已审核"
                    break;
            }
        }
        searchList()
        return{
            ...toRefs(data),
            searchList,
            goodsstate
        }
    }
}
</script>