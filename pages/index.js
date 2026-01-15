import Link from 'next/link';

export default function Home() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>科博会官网 - 首页</title>
        <style>
          body {
            font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
            background-color: #F9FAFB;
            color: #1F2937;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px;
          }
          h1 {
            color: #2563EB;
            font-size: 36px;
            margin-bottom: 30px;
            text-align: center;
          }
          .links {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          .link-item {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
            text-align: center;
            transition: all 0.3s ease;
          }
          .link-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
          }
          .link-item a {
            color: #2563EB;
            text-decoration: none;
            font-size: 20px;
            font-weight: 600;
          }
          .link-item a:hover {
            text-decoration: underline;
          }
          .description {
            color: #6B7280;
            margin-top: 10px;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            margin-top: 60px;
            color: #6B7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div className="container">
          <h1>中国北京国际科技产业博览会</h1>
          <div className="links">
            <div className="link-item">
              <Link href="/kebohui.html">科博会首页</Link>
              <div className="description">中国北京国际科技产业博览会官方首页</div>
            </div>
            <div className="link-item">
              <Link href="/booth-ideal.html">理想汽车线上展台</Link>
              <div className="description">理想汽车在科博会上的线上展台详情</div>
            </div>
            <div className="link-item">
              <Link href="/exhibition_platform.html">大都会展数智平台</Link>
              <div className="description">展会产业数字图谱与服务平台</div>
            </div>
            <div className="link-item">
              <Link href="/douyin-video.html">人民日报抖音视频</Link>
              <div className="description">内嵌人民日报官方抖音视频的页面</div>
            </div>
            <div className="link-item">
              <Link href="/register-test.html">展会报名测试</Link>
              <div className="description">测试展会报名接口功能的页面</div>
            </div>
          </div>
          <div className="footer">
            <p>© 2026 中国北京国际科技产业博览会. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  );
}