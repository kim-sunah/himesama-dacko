import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../component/v0/card"
import { Label } from "../../../component/v0/label"
import { Input } from "../../../component/v0/input"
import { Textarea } from "../../../component/v0/textarea"
import { Button } from "../../../component/v0/button"

export default function Notice() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_400px] px-4">
      <div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">공지사항</h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>새로운 기능 출시</CardTitle>
                <CardDescription>2023년 5월 1일 작성</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                이번 업데이트를 통해 새로운 기능들이 추가되었습니다. 자세한 내용은 업데이트 로그를 확인해 주세요.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>시스템 점검 안내</CardTitle>
                <CardDescription>2023년 4월 15일 작성</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                서버 업그레이드를 위해 4월 20일 밤 12시부터 2시간 동안 서비스가 중단됩니다. 이용에 참고 부탁드립니다.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>문의하기</CardTitle>
            <CardDescription>궁금한 점이 있다면 문의해 주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="이름을 입력해 주세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="이메일을 입력해 주세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">문의 내용</Label>
                <Textarea id="message" placeholder="문의 내용을 입력해 주세요" className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">
                문의하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}