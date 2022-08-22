const todoListPage = ReactDOM.createRoot(document.getElementById('todoListPage'));
const { useState } = React;

function SortItem(ToDoItemList) {
    if (ToDoItemList.length === 0) return 0;
    ToDoItemList.map((item, i) => {
        item.index = i;
    });
    return ToDoItemList.length;
}

function removeItem(RemoveItemIndex, ToDoItemList) {
    console.log(ToDoItemList);
    console.log(RemoveItemIndex);
    ToDoItemList.splice(RemoveItemIndex, 1);
    return ToDoItemList;
}

function App() {
    const [ToDoItem, setToDoItem] = useState([]);
    const [NewItem, setNewItem] = useState('');
    return (
        <div>
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入代辦事項" onChange={(e) => {
                            if (e.target.value) setNewItem(e.target.value);
                        }} />
                        <a href="#" onClick={() => {
                            let nextIndex = SortItem(ToDoItem);
                            console.log(nextIndex);
                            setToDoItem([...ToDoItem, { item: NewItem, complete: false, index: nextIndex }]);
                        }}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li><a href="#" className="active">全部</a></li>
                            <li><a href="#">待完成</a></li>
                            <li><a href="#">已完成</a></li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                {
                                    ToDoItem.map((item, i) => {
                                        SortItem(ToDoItem);
                                        return (
                                            <li key={i}>
                                                <label className="todoList_label">
                                                    <input type="checkbox" className="todoList_input" />
                                                    <span>{item.item}</span>
                                                </label>
                                                <a href="#" onClick={() => {
                                                    setToDoItem(ToDoItem.filter(item => item.index !== i));
                                                }}>
                                                    <i className="fa fa-times"></i>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="todoList_statistics">
                                <p> 5 個已完成項目</p>
                                <a href="#">清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

todoListPage.render(<App />);