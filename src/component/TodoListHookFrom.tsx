// Todolist.tsx 
import { useState } from "react";
import { useForm } from "react-hook-form";

type Task = {
    title: string;
    type: string;
    dueDate: string;
};

export default function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Task>({
        defaultValues: { title: "", type: "", dueDate: "" },
    });

    const onAdd = (data: Task) => {
        if (!data.title.trim()) return;
        setTasks((prev) => [...prev, data]);
        // setTasks คือฟังก์ชันที่ได้จาก useState สำหรับอัปเดตค่าใน state tasks 
        // (prev) => [...prev, data] คือ callback function, prev คือค่าเก่า (state เดิมของ tasks) 
        // [...prev, data] ใช้ spread operator เพื่อก็อปปี้ array เก่า แล้วต่อท้ายด้วย data (งานใหม่ที่เพิ่งกรอกเข้ามา) 
        reset();
    };

    return (
        <div>
            <h1>My To-do List</h1>
            {/*  
            // onSubmit={handleSubmit(onAdd)}  
            // handleSubmit เป็นฟังก์ชันจาก RHF ที่จะ ตรวจ validation ตาม rule (required, pattern ฯลฯ) 
            // ถ้าผ่าน → เรียก onAdd(data) โดยส่งค่าทุกช่องมาเป็น object 
            // ถ้าไม่ผ่าน → ใส่ error ให้ใน formState.errors 
            // noValidate คือการสั่งให้ ปิด HTML5 validation ของ browser 
            // จะให้ RHF เป็นคนจัดการ validation แทน } */}
            <form onSubmit={handleSubmit(onAdd)} noValidate>
                <input
                    placeholder="งานที่ต้องทำ"
                    {...register("title", { required: "กรุณากรอกชื่องาน" })}
                // register มาจาก React Hook Form → เป็นฟังก์ชันที่ผูก <input> เข้ากับระบบของ RHF 
                // "title" คือชื่อฟิลด์ → RHF จะเก็บค่าที่พิมพ์ไว้ใน object เช่น {title: "ชื่องาน" } 
                // {required: "กรุณากรอกชื่องาน" } คือ rule validation บังคับให้ช่องนี้ต้องไม่ว่าง 
                // ...register(...) จะกระจาย props ที่ RHF ต้องการ (เช่น onChange, onBlur, ref) ลงไปใน <input> 
                />
                {errors.title && <div>{errors.title.message}</div>}

                <select {...register("type")}>
                    <option value="">เลือกประเภทงาน</option>
                    <option value="เรียน">เรียน</option>
                    <option value="ทำงาน">ทำงาน</option>
                    <option value="บ้าน">งานบ้าน</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                </select>

                <input type="date" {...register("dueDate")} />

                <button type="submit">Add</button>
            </form>


            <ul>
                {tasks.map((t, idx) => (
                    <li key={idx}>
                        {t.title}
                        {t.type && ` | ประเภท: ${t.type}`}
                        {t.dueDate && ` | ส่ง: ${t.dueDate}`}
                    </li>
                ))}
            </ul>
        </div>
    );
} 