// Todolist.tsx 
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


// 1) Zod schema 
const TaskSchema = z.object({
    title: z.string().trim().min(1, "กรุณากรอกชื่องาน"),
    // อนุญาตให้เว้นว่าง หรือเลือกค่าจากรายการ 
    type: z
        .enum(["เรียน", "ทำงาน", "บ้าน", "อื่นๆ"])
        .optional()
        .or(z.literal("")),
    // input type="date" จะได้รูปแบบ YYYY-MM-DD 
    dueDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)")
        .optional()
        .or(z.literal("")),
});


type Task = z.infer<typeof TaskSchema>;


export default function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Task>({
        resolver: zodResolver(TaskSchema),
        defaultValues: { title: "", type: "", dueDate: "" },
        mode: "onSubmit",
    });


    const onAdd = (data: Task) => {
        setTasks((prev) => [...prev, data]);
        reset(); // เคลียร์ฟอร์มหลังเพิ่ม 
    };


    return (
        <div>
            <h1>My To-do List</h1>


            <form onSubmit={handleSubmit(onAdd)} noValidate>
                {/* ชื่องาน (บังคับ) */}
                <div>
                    <input
                        placeholder="งานที่ต้องทำ"
                        {...register("title")}
                    />
                    {errors.title && <div>{errors.title.message}</div>}
                </div>


                {/* ประเภทงาน (ไม่บังคับ) */}
                <div>
                    <select {...register("type")}>
                        <option value="">เลือกประเภทงาน</option>
                        <option value="เรียน">เรียน</option>
                        <option value="ทำงาน">ทำงาน</option>
                        <option value="บ้าน">งานบ้าน</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                    {errors.type && <div>{errors.type.message}</div>}
                </div>


                {/* วันที่ต้องส่ง (ไม่บังคับ) */}
                <div>
                    <input type="date" {...register("dueDate")} />
                    {errors.dueDate && <div>{errors.dueDate.message}</div>}
                </div>


                <button type="submit" disabled={isSubmitting}>Add</button>
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