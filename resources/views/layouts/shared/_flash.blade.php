@if (count($errors) > 0)
    <div class="layui-row flash_msg">
        <div class="layui-col-xs12">
            <div class="layui-btn layui-btn-danger" style="margin-left: 23px;width: 328px;">
                <ol>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ol>
            </div>
        </div>
    </div>
@endif