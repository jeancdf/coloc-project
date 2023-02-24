const storagekey = 'walid=&éé"';
export function setJwt(token: string): void {
    localStorage.setItem(storagekey, token)
    window.location.replace('/newcoloc');

}
export function getJwt(): string | null {
    return localStorage.getItem(storagekey);
}
export function deleteJwt(): void {
    localStorage.removeItem(storagekey);
    window.location.replace('/');
}