const todoListPage = ReactDOM.createRoot(document.getElementById('todoListPage'));
const { useState } = React;

function SortItem(ToDoItemList) {
    if (ToDoItemList.length === 0) return 0;
    ToDoItemList.map((item, i) => {
        item.index = i;
    });
    return ToDoItemList.length;
}

function RemoveOneOrAllItem(ToDoItem, Index, setToDoItem) {
    SortItem(ToDoItem);
    if (Index === "ALL") {
        ToDoItem = ToDoItem.filter(item => item.complete !== true);
    } else {
        ToDoItem = ToDoItem.filter(item => item.index !== Index);
    }
    setToDoItem(ToDoItem);
    return ToDoItem;
}

function ToDoListItem({ ToDoItem, setToDoItem, CompleteItemNum, setCompleteItemNum }) {
    return (
        <ul className="todoList_item">
            {
                ToDoItem.map((item, i) => {
                    return (
                        <li key={i}>
                            <label className="todoList_label">
                                <input type="checkbox" className="todoList_input" checked={item.complete} onChange={() => {
                                    item.complete = !item.complete;
                                    setToDoItem(ToDoItem);
                                    setCompleteItemNum(ToDoItem.filter(Item => Item.complete === true).length);
                                }} />
                                <span>{item.item}</span>
                            </label>
                            <a href="#" onClick={() => {
                                setCompleteItemNum(RemoveOneOrAllItem(ToDoItem, i, setToDoItem).filter(Item => Item.complete === true).length);
                            }}>
                                <i className="fa fa-times"></i>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

function App() {
    const [ToDoItem, setToDoItem] = useState([]);
    const [NewItem, setNewItem] = useState('');
    const [CompleteItemNum, setCompleteItemNum] = useState(0);
    return (
        <div>
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" value={NewItem} onChange={(e) => {
                            setNewItem(e.target.value);
                        }} />
                        <a href="#" onClick={() => {
                            if (NewItem) setToDoItem([...ToDoItem, { item: NewItem, complete: false, index: SortItem(ToDoItem) }]);
                            setNewItem('');
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
                            <ToDoListItem ToDoItem={ToDoItem} setToDoItem={setToDoItem} CompleteItemNum={CompleteItemNum} setCompleteItemNum={setCompleteItemNum} />
                            <div className="todoList_statistics">
                                <p> {CompleteItemNum} 個已完成項目</p>
                                <a href="#" onClick={() => {
                                    setCompleteItemNum(RemoveOneOrAllItem(ToDoItem, "ALL", setToDoItem).filter(Item => Item.complete === true).length);
                                }}>清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

todoListPage.render(<App />);