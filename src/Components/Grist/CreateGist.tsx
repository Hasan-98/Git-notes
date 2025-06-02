import { useForm, useFieldArray } from "react-hook-form";
import styles from "./CreateGist.module.css";
import useAuthStore from "../../store/authStore";
import { createGist } from "../../services/gistService";
import { LucideTrash } from "lucide-react";

export default function CreateGist() {
    const { isLoggedIn } = useAuthStore();
    
    const { 
        register, 
        control, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset 
    } = useForm({
        defaultValues: {
            description: "",
            files: [{ filename: "", content: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "files"
    });

    const onSubmit = async (data) => {
        if (!isLoggedIn) {
            alert("Please login to create a gist");
            return;
        }

        try {
            const gistData = {
                description: data.description,
                public: true,
                files: {}
            };

            data.files.forEach((file: any) => {
                if (file.filename && file.content) {
                    gistData.files[file.filename] = {
                        content: file.content
                    };
                }
            });

            console.log("Creating gist:", gistData);
            const res = await createGist(gistData);
            console.log("Gist created:", res);
            
            reset();
            alert("Gist created successfully!");
        } catch (error) {
            console.error("Error creating gist:", error);
            alert("Failed to create gist");
        }
    };

    const addFile = () => {
        append({ filename: "", content: "" });
    };

    const removeFile = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <div className={styles["container"]}>
            <h1 className={styles["title"]}>Create Gist</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
                {/* Description Input */}
                <div className={styles["inputGroup"]}>
                    <input
                        {...register("description", { 
                            required: "Description is required",
                            minLength: { value: 3, message: "Description must be at least 3 characters" }
                        })}
                        type="text"
                        placeholder="This is a Gist Description"
                        className={styles["descriptionInput"]}
                    />
                    {errors.description && (
                        <span className={styles["error"]}>{errors.description.message}</span>
                    )}
                </div>

                {/* Files Section */}
                <div className={styles["filesSection"]}>
                    {fields.map((field, index) => (
                        <div key={field.id} className={styles["fileGroup"]}>
                            <div className={styles["fileHeader"]}>
                                <input
                                    {...register(`files.${index}.filename`, {
                                        required: "Filename is required"
                                    })}
                                    type="text"
                                    placeholder="filename.txt"
                                    className={styles["filenameInput"]}
                                />
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className={styles["deleteButton"]}
                                        aria-label="Delete file"
                                    >
                                    <LucideTrash />
                                    </button>
                                )}
                            </div>
                            
                            {errors.files?.[index]?.filename && (
                                <span className={styles["error"]}>
                                    {errors.files[index].filename.message}
                                </span>
                            )}

                            <textarea
                                {...register(`files.${index}.content`, {
                                    required: "File content is required"
                                })}
                                placeholder="Enter your code here..."
                                className={styles["contentTextarea"]}
                                rows={10}
                            />
                            
                            {errors.files?.[index]?.content && (
                                <span className={styles["error"]}>
                                    {errors.files[index].content.message}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className={styles["actions"]}>
                    <button
                        type="button"
                        onClick={addFile}
                        className={styles["addFileButton"]}
                    >
                        Add file
                    </button>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting || !isLoggedIn}
                        className={styles["createButton"]}
                    >
                        {isSubmitting ? "Creating..." : "Create Gist"}
                    </button>
                </div>
            </form>
        </div>
    );
}