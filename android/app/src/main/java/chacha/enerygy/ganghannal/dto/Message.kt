package chacha.enerygy.ganghannal.dto

class Message(val path: String, val data: String) {
    override fun toString(): String {
        return "Message(path='$path', data=$data)"
    }
}