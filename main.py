from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import base64

class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

        f = open("index.html").read()

        self.wfile.write(bytes(f, 'utf-8'))

    def do_POST(self):
        if self.path == "/send-img":
            data = self.rfile.read(int(self.headers.get('Content-Length'))).decode("utf-8")

            # with open("image.png", "wb") as f:
            #     f.write(decodebytes(data))

            print(data)

if __name__ == "__main__":        
    webServer = HTTPServer(("localhost", 8080), Server)
    print("Server started http://%s:%s" % ("localhost", 8080))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")