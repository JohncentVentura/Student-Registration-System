Public Class MainForm
    Private Sub ExitToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles ExitToolStripMenuItem.Click
        Me.Close()
    End Sub

    Private Sub StudentToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles StudentToolStripMenuItem.Click
        Me.Enabled = False
        Form1.Show()
    End Sub

    Private Sub SubjectToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles SubjectToolStripMenuItem.Click
        Me.Enabled = False
        Form2.Show()
    End Sub

    Private Sub CourseToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles CourseToolStripMenuItem.Click
        Me.Enabled = False
        Form3.Show()
    End Sub

    Private Sub EnrollToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles EnrollToolStripMenuItem.Click
        Me.Enabled = False
        Form4.Show()
    End Sub

    Private Sub AboutToolStripMenuItem_Click(sender As Object, e As EventArgs) Handles AboutToolStripMenuItem.Click
        'Me.Enabled = False
        About.Show()
    End Sub
End Class