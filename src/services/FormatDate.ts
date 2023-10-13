export function formatDate(s: string){
    return new Date(s).toLocaleDateString().toString();
}