const todoListPage = ReactDOM.createRoot(document.getElementById('todoListPage'));
const { useState, useEffect } = React;

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

function ToDoListItem({ ToDoItem, setToDoItem, setCompleteItemNum, CurrentStatus }) {
    return (
        <ul className="todoList_item">
            {
                ToDoItem.map((item, i) => {
                    if ((item.complete === CurrentStatus && CurrentStatus !== "ALL") || (CurrentStatus === "ALL")) {
                        return (
                            <li key={i}>
                                <label className="todoList_label">
                                    <input type="checkbox" className="todoList_input" checked={item.complete} onChange={() => {
                                        item.complete = !item.complete;
                                        // setToDoItem(ToDoItem);
                                        setToDoItem(JSON.parse(JSON.stringify(ToDoItem)));
                                    }} />
                                    <span>{item.item}</span>
                                </label>
                                <a href="#" onClick={() => {
                                    RemoveOneOrAllItem(ToDoItem, i, setToDoItem);
                                }}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                        )
                    }
                })
            }
        </ul>
    )
}

function CompleteStatusList({ setCurrentStatus }) {
    let statusActive;
    let status;
    const [CompleteStatus, setCompleteStatus] = useState([{ status: "??????", active: true }, { status: "?????????", active: false }, { status: "?????????", active: false }]);
    return (
        <ul className="todoList_tab">
            {
                CompleteStatus.map((EachStatus, i) => {
                    EachStatus.active ? statusActive = "active" : statusActive = "NotActive"
                    return (
                        <li key={i} >
                            <a href="#" className={statusActive} onClick={() => {
                                CompleteStatus.forEach((CompleteStatusElement, CompleteStatusIndex) => {
                                    CompleteStatusIndex === i ? CompleteStatusElement.active = true : CompleteStatusElement.active = false;
                                });
                                EachStatus.status === "??????" ? status = "ALL" : EachStatus.status === "?????????" ? status = true : status = false
                                setCurrentStatus(status);
                                // setCompleteStatus(CompleteStatus); // Why ???????????????????????? CompleteStatus.map ??                                
                                setCompleteStatus(JSON.parse(JSON.stringify(CompleteStatus)));
                            }
                            }>{EachStatus.status}</a>
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
    const [CurrentStatus, setCurrentStatus] = useState('ALL');
    let DisplayActive = true;
    ToDoItem.length === 0 ? DisplayActive = true : DisplayActive = false;
    useEffect(() => {
        setCompleteItemNum(ToDoItem.filter(Item => Item.complete === false).length);
    }, [ToDoItem]);
    return (
        <div>
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="?????????????????????" value={NewItem} onChange={(e) => {
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
                        <CompleteStatusList setCurrentStatus={setCurrentStatus} />
                        <p className={`NoItemShow ${DisplayActive}DisPlay`}>????????????????????????</p>
                        <div className={`todoList_items ${!DisplayActive}DisPlay`}>
                            <ToDoListItem ToDoItem={ToDoItem} setToDoItem={setToDoItem} setCompleteItemNum={setCompleteItemNum} CurrentStatus={CurrentStatus} />
                            <div className="todoList_statistics">
                                <p> {CompleteItemNum} ??????????????????</p>
                                <a href="#" onClick={() => {
                                    setCompleteItemNum(RemoveOneOrAllItem(ToDoItem, "ALL", setToDoItem).filter(Item => Item.complete === false).length);
                                }}>?????????????????????</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

todoListPage.render(<App />);